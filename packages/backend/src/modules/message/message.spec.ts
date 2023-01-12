import { Injectable, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthTestModule } from "../auth/auth.test.module";
import { DbModule, InMemoryDbModule } from "../db/db.module";
import { OpportunityModule } from "../opportunity/opportunity.module";
import type { Email } from "./email.service";
import { MessageController } from "./message.controller";
import { MessageEntity } from "./message.entity";
import { MessageService } from "./message.service";
import { MessageThreadEntity } from "./thread.entity";

const emailTestService = {
  async send(email: Email): Promise<void> {},
};

@Module({
  imports: [
    InMemoryDbModule,
    AuthTestModule,
    TypeOrmModule.forFeature([MessageThreadEntity]),
    TypeOrmModule.forFeature([MessageEntity]),
    OpportunityModule,
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
class MessageTestModule {}

describe("/message", () => {
  beforeAll(async () => {});
});
