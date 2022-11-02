import { Module } from "@nestjs/common";
import { DynamoDBModule } from "../ddb/ddb.module";
import { OpportunityController } from "./opportunity.controller";
import { OpportunityEntity } from "./opportunity.entity";
import { OpportunityService } from "./opportunity.service";

@Module({
  imports: [DynamoDBModule],
  controllers: [OpportunityController],
  providers: [OpportunityService, OpportunityEntity],
})
export class OpportunityModule {}
