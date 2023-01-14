import { NestFactory } from "@nestjs/core";
import type { S3Event, S3Handler } from "aws-lambda";
import { MessageService } from "./modules/message/message.service";
import { MessageStandaloneModule } from "./modules/message/message.module";

const messageService: Promise<MessageService> = (async () => {
  const nestApp = await NestFactory.createApplicationContext(
    MessageStandaloneModule
  );
  return nestApp.get(MessageService);
})();

/**
 * Handles new emails arriving when SES dumps them into our received emails bucket
 */
export const handler: S3Handler = async (event: S3Event): Promise<void> => {};
