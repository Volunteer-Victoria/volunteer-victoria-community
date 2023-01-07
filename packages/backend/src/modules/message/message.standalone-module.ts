import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbModule } from "../db/db.module";
import { MessageService } from "./message.service";
import { MessageThreadEntity } from "./thread.entity";

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([MessageThreadEntity])],
  providers: [MessageService],
})
export class MessageStandaloneModule {}
