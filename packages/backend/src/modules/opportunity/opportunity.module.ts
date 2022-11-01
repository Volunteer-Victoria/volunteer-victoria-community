import { Module } from "@nestjs/common";
import { DynamoDBModule } from "../ddb/ddb.module";
import { OpportunityController } from "./opportunity.controller";
import { OpportunityService } from "./opportunity.service";

@Module({
  imports: [DynamoDBModule],
  controllers: [OpportunityController],
  providers: [OpportunityService],
})
export class OpportunityModule {}
