import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { OpportunityModule } from "./opportunity/opportunity.module";

@Module({
  imports: [OpportunityModule, AuthModule],
})
export class VVCModule {}
