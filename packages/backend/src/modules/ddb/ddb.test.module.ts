import { LocalstackModule } from "../localstack/localstack.module";
import { DynamoDBService } from "./ddb.service";

/**
 * Starts a localstack container for DynamoDB
 */
@Module({
  imports: [LocalstackModule],
  providers: [
    {
      provide: DynamoDBService,
      useFactory: async () => new DynamoDBService(await createAppTable()),
    },
  ],
  exports: [DynamoDBService],
})
export class DynamoDBTestModule {}
