import { NestFactory } from "@nestjs/core";
import type { S3Event, S3Handler } from "aws-lambda";
import { MessageModule } from "./modules/message/message.module";
import { MessageService } from "./modules/message/message.service";
import S3 from "aws-sdk/clients/s3";
import assert from "assert";
import { Stream } from "stream";

const messageService: Promise<MessageService> = (async () => {
  const nestApp = await NestFactory.createApplicationContext(MessageModule);
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
      const obj = await s3
        .getObject({ Bucket: data.bucket.name, Key: data.object.key })
        .promise();
      assert(obj.Body !== undefined);
      assert(obj.Body instanceof Stream || obj.Body instanceof Buffer);
      await messages.receiveMail(obj.Body);
    }
  } catch (ex) {
    console.error(ex);
  }
};
