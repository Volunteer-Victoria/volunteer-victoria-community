import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { OpportunityModule } from "./opportunity/opportunity.module";
import { RootController } from "./root/root.controller";

@Module({
  controllers: [RootController],
  imports: [OpportunityModule, AuthModule],
})
export class VVCModule {}
