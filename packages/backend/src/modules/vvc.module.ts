import { Module } from "@nestjs/common";
import { OpportunityModule } from "./opportunity/opportunity.module";

@Module({
  imports: [OpportunityModule],
})
export class VVCModule {}
