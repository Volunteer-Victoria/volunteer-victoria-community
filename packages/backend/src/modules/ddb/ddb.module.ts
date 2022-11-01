import { Injectable, Module } from "@nestjs/common";
import DynamoDB, { CreateTableInput } from "aws-sdk/clients/dynamodb";
import { assert } from "console";
import { Table } from "dynamodb-toolbox";
import { DynamoDBService } from "./ddb.service";

const tableName = process.env["DDB_TABLE_NAME"]!;
assert(tableName.length > 0);

const awsConfig = {
  ...(process.env["AWS_ENDPOINT"]
    ? { endpoint: process.env["AWS_ENDPOINT"] }
    : undefined),
  ...(process.env["AWS_REGION"]
    ? { region: process.env["AWS_REGION"] }
    : undefined),
};

const tableSpec: CreateTableInput = {
  TableName: tableName,
  BillingMode: "PAY_PER_REQUEST",
  AttributeDefinitions: [
    { AttributeName: "pk", AttributeType: "S" },
    { AttributeName: "sk", AttributeType: "S" },
  ],
  KeySchema: [
    { AttributeName: "pk", KeyType: "HASH" },
    { AttributeName: "sk", KeyType: "RANGE" },
  ],
};

async function assureTableExists() {
  const ddb = new DynamoDB(awsConfig);
  const tableInfo = await ddb.describeTable({ TableName: tableName }).promise();
  if (tableInfo.Table === undefined) {
    console.info(`Creating new ddb table ${JSON.stringify(tableInfo)}`);
    await ddb.createTable(tableSpec).promise();
  } else {
    console.info(`Updating ddb table ${JSON.stringify(tableInfo)}`);
    await ddb.updateTable(tableSpec).promise();
  }
}

async function createAppTable() {
  await assureTableExists();

  const DocumentClient = new DynamoDB.DocumentClient(awsConfig);

  return new Table({
    name: tableName,

    partitionKey: "pk",
    sortKey: "sk",

    DocumentClient,
  });
}

@Module({
  providers: [
    {
      provide: DynamoDBService,
      useFactory: () => createAppTable(),
    },
  ],
})
export class DynamoDBModule {}
