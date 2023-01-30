import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DbModule } from "./db/db.module";
import { MessageModule } from "./message/message.module";
import { OpportunityModule } from "./opportunity/opportunity.module";
import { RootController } from "./root/root.controller";

// TODO move to ConfigService, and mock it properly in tests
@Module({
  imports: [MessageModule, OpportunityModule, AuthModule, DbModule],
  controllers: [RootController],
})
export class AppModule {}
