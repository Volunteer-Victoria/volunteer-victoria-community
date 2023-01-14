import { NestFactory } from "@nestjs/core";
import { MessageModule } from "./modules/message/message.module";
import { MessageService } from "./modules/message/message.service";

const messageService: Promise<MessageService> = (async () => {
  const nestApp = await NestFactory.createApplicationContext(MessageModule);
  return nestApp.get(MessageService);
})();

/**
 * Handles new emails arriving when SES dumps them into our received emails bucket
 */
// export const handler: S3Handler = async (event: S3Event): Promise<void> => {};
