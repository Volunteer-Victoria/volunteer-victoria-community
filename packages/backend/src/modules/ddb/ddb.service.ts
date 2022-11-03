import { Injectable } from "@nestjs/common";
import { Table } from "dynamodb-toolbox";
import DynamoDB from "aws-sdk/clients/dynamodb";
import { isRunningLocally } from "../../util";

async function ensureTableExists(
  tableName: string,
  awsConfig: DynamoDB.Types.ClientConfiguration
) {
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

export async function makeDynamoDBService(
  tableName: string,
  awsConfig: DynamoDB.Types.ClientConfiguration
): Promise<DynamoDBService> {
  if (isRunningLocally) {
    await ensureTableExists(tableName, awsConfig);
  }

  const DocumentClient = new DynamoDB.DocumentClient(awsConfig);
  const table = new Table({
    name: tableName,
    partitionKey: "pk",
    sortKey: "sk",
    DocumentClient,
  });

  return new DynamoDBService(table);
}

@Injectable()
export class DynamoDBService {
  constructor(public readonly table: Table<string, "pk", "sk">) {}
}
