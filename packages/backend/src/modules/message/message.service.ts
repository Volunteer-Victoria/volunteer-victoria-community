import { Injectable } from "@nestjs/common";
import type { OpportunityService } from "../opportunity/opportunity.service";

@Injectable()
export class MessageService {
  constructor(private readonly opportunities: OpportunityService) {}

  async startThread(opportunityId: string, message: string): Promise<void> {
    const opp = await this.opportunities.findOne(opportunityId);
  }

  async sendMessage(inboxId: string, message: string): Promise<void> {}
}
