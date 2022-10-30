import DynamoDB from "aws-sdk/clients/dynamodb";
import { Table } from "dynamodb-toolbox";

const DocumentClient = new DynamoDB.DocumentClient({
  ...(process.env["AWS_ENDPOINT"]
    ? { endpoint: process.env["AWS_ENDPOINT"] }
    : undefined),
  ...(process.env["AWS_REGION"]
    ? { region: process.env["AWS_REGION"] }
    : undefined),
});

// Instantiate a table
export const AppTable = new Table({
  // Specify table name (used by DynamoDB)
  name: process.env["DDB_TABLE_NAME"]!,

  // Define partition and sort keys
  partitionKey: "pk",
  sortKey: "sk",

  // Add the DocumentClient
  DocumentClient,
});
