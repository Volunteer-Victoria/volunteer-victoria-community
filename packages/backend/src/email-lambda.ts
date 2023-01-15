import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import assert from "assert";
import type { S3Event, S3Handler } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";
import { Stream } from "stream";
import { DbModule } from "./modules/db/db.module";
import { MessageModule } from "./modules/message/message.module";
import { MessageService } from "./modules/message/message.service";

@Module({
  imports: [DbModule, MessageModule],
})
class MessageStandaloneModule {}

const messageService: Promise<MessageService> = (async () => {
  const nestApp = await NestFactory.createApplicationContext(
    MessageStandaloneModule
  );
  return nestApp.get(MessageService);
})();

const s3 = new S3();

/**
 * Handles new emails arriving when SES dumps them into our received emails bucket
 */
export const handler: S3Handler = async (event: S3Event): Promise<void> => {
  try {
    const messages = await messageService;
    for (const { s3: data } of event.Records) {
      const Key = data.object.key;
      console.info(`Processing S3 event for key: ${Key}`, data);
      const obj = await s3
        .getObject({ Bucket: data.bucket.name, Key })
        .promise();
      assert(obj.Body !== undefined);
      assert(obj.Body instanceof Stream || obj.Body instanceof Buffer);
      console.dir(obj.Body);
      await messages.receiveMail(obj.Body);
    }
  } catch (ex) {
    console.error(ex);
  }
};
