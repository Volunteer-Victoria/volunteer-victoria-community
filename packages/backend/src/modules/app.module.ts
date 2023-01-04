import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DbModule } from "./db/db.module";
import { OpportunityController } from "./opportunity/opportunity.controller";
import { OpportunityModule } from "./opportunity/opportunity.module";
import { RootController } from "./root/root.controller";

@Module({
  imports: [OpportunityModule, AuthModule, DbModule],
  controllers: [RootController],
})
export class AppModule {}
