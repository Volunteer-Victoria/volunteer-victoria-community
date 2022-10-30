import { Module } from "@nestjs/common";
import { OpportunityController } from "./opportunity.controller";

@Module({
  controllers: [OpportunityController],
  providers: [],
})
export class OpportunityModule {}
