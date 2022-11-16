import { Module } from "@nestjs/common";
import type DynamoDB from "aws-sdk/clients/dynamodb";
import assert from "assert";
import { DynamoDBService, makeDynamoDBService } from "./ddb.service";

const awsConfig: DynamoDB.Types.ClientConfiguration = {
  ...(process.env["AWS_ENDPOINT"]
    ? { endpoint: process.env["AWS_ENDPOINT"] }
    : undefined),
  ...(process.env["AWS_REGION"]
    ? { region: process.env["AWS_REGION"] }
    : undefined),
};

@Module({
  providers: [
    {
      provide: DynamoDBService,
      useFactory: () => {
        const tableName = process.env["DDB_TABLE_NAME"]!;
        assert(tableName.length > 0);
        return makeDynamoDBService(tableName, awsConfig);
      },
    },
  ],
  exports: [DynamoDBService],
})
export class DynamoDBModule {}
