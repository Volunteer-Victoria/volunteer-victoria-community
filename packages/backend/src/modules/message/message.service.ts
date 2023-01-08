import { Instant } from "@js-joda/core";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { uniqueId } from "../../util";
import type { OpportunityService } from "../opportunity/opportunity.service";
import { MessageEntity } from "./message.entity";
import { MessageThreadEntity } from "./thread.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messages: Repository<MessageEntity>,
    @InjectRepository(MessageThreadEntity)
    private readonly threads: Repository<MessageThreadEntity>,
    private readonly opportunities: OpportunityService
  ) {}

  async startThread(
    opportunityId: string,
    applicant: { name: string; email: string; userId: string },
    message: string
  ): Promise<void> {
    const opp = await this.opportunities.findOne(opportunityId);
    if (opp === undefined) {
      throw new NotFoundException(`Opportunity ID does not exist`);
    }

    const thread = new MessageThreadEntity();
    thread.opportunityId = opportunityId;
    thread.applicantEmail = applicant.email;
    thread.applicantName = applicant.name;
    thread.applicantUserId = applicant.userId;
    thread.applicantInboxId = uniqueId();
    thread.posterInboxId = uniqueId();
    thread.createdAt = Instant.now().epochSecond();

    await this.threads.save(thread);
    await this.sendMessage(thread.applicantInboxId, message);
  }

  async sendMessage(inboxId: string, message: string): Promise<void> {}
}
