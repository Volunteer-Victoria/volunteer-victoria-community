import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbModule } from "../db/db.module";
import { OpportunityModule } from "../opportunity/opportunity.module";
import { EmailService, SESTransportFactory } from "./email.service";
import { MessageController } from "./message.controller";
import { MessageEntity } from "./message.entity";
import { MessageService } from "./message.service";
import { MessageThreadEntity } from "./thread.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageThreadEntity]),
    TypeOrmModule.forFeature([MessageEntity]),
    OpportunityModule,
  ],
  providers: [MessageService, EmailService, SESTransportFactory],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
