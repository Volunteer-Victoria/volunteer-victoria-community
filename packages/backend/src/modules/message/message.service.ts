import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageService {
  async startThread(opportunityId: string, message: string): Promise<void> {}

  async sendMessage(inboxId: string, message: string): Promise<void> {}
}
