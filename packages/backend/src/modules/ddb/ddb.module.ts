import { Module } from "@nestjs/common";
import DynamoDB from "aws-sdk/clients/dynamodb";
import { assert } from "console";
import { Table } from "dynamodb-toolbox";
import { isRunningLocally } from "../../util";
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

@Module({
  providers: [
    {
      provide: DynamoDBService,
      useFactory: async () =>
        new DynamoDBService(await createAppTable(awsConfig)),
    },
  ],
  exports: [DynamoDBService],
})
export class DynamoDBModule {}
