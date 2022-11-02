import { Module } from "@nestjs/common";
import DynamoDB from "aws-sdk/clients/dynamodb";
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

const updateTableSpec = {
  TableName: tableName,
  BillingMode: "PAY_PER_REQUEST",
  AttributeDefinitions: [
    { AttributeName: "pk", AttributeType: "S" },
    { AttributeName: "sk", AttributeType: "S" },
  ],
};

const createTableSpec = {
  ...updateTableSpec,
  KeySchema: [
    { AttributeName: "pk", KeyType: "HASH" },
    { AttributeName: "sk", KeyType: "RANGE" },
  ],
};

async function assureTableExists() {
  const ddb = new DynamoDB(awsConfig);
  try {
    const resp = await ddb.updateTable(updateTableSpec).promise();
    console.info(`Updated ddb table ${JSON.stringify(resp)}`);
  } catch (ex: any) {
    if (ex.code === "ResourceNotFoundException") {
      const resp = await ddb.createTable(createTableSpec).promise();
      console.info(`Created ddb table ${JSON.stringify(resp)}`);
    } else {
      throw ex;
    }
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
      useFactory: async () => new DynamoDBService(await createAppTable()),
    },
  ],
  exports: [DynamoDBService],
})
export class DynamoDBModule {}
