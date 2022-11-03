import { Module } from "@nestjs/common";
import { uniqueId } from "../../util";
import { LocalstackModule } from "../localstack/localstack.module";
import { LocalstackService } from "../localstack/localstack.service";
import { DynamoDBService, makeDynamoDBService } from "./ddb.service";

const TEST_REGION = "ca-central-1";

/**
 * Starts a localstack container for DynamoDB
 */
@Module({
  imports: [LocalstackModule],
  providers: [
    {
      provide: DynamoDBService,
      inject: [LocalstackService],
      useFactory: (localstack: LocalstackService) => {
        return makeDynamoDBService(uniqueId(), {
          region: TEST_REGION,
          endpoint: localstack.endpoint,
        });
      },
    },
  ],
  exports: [DynamoDBService],
})
export class DynamoDBTestModule {}
