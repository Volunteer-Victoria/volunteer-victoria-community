import { Module } from "@nestjs/common";
import { OpportunityController } from "./opportunity.controller";
import { OpportunityService } from "./opportunity.service";

@Module({
  controllers: [OpportunityController],
  providers: [OpportunityService],
})
export class OpportunityModule {}
