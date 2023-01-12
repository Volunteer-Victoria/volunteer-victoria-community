import { Duration, Instant, Period, TemporalUnit } from "@js-joda/core";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { MoreThan } from "typeorm";
import { uniqueId } from "../../util";
import type { OpportunityService } from "../opportunity/opportunity.service";
import type { EmailService } from "./email.service";
import { MessageEntity } from "./message.entity";
import { MessageThreadEntity } from "./thread.entity";

function threadSubject(opportunityTitle: string): string {
  return opportunityTitle;
}

const MAX_MESSAGES_PER_HOUR = 25;

interface MessageOptions {
  /**
   * Whether to BCC the sender of this email at their real email address.
   * This is for letting them know that they successfully sent a message when a thread is started.
   */
  bccSender: boolean;
}

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messages: Repository<MessageEntity>,
    @InjectRepository(MessageThreadEntity)
    private readonly threads: Repository<MessageThreadEntity>,
    private readonly opportunities: OpportunityService,
    private readonly email: EmailService
  ) {}

  /**
   * @returns New thread if one has been created, and the existing thread if one already exists.
   */
  async startThread(
    opportunityId: string,
    applicant: { name: string; email: string; userId: string }
  ): Promise<{ thread: MessageThreadEntity; alreadyExisted: boolean }> {
    const [opp, existingThread] = await Promise.all([
      this.opportunities.findOne(opportunityId),
      this.threads.findOneBy({
        opportunityId,
        applicantUserId: applicant.userId,
      }),
    ]);

    if (opp === null) {
      throw new NotFoundException(`Opportunity ID does not exist`);
    } else if (existingThread !== null) {
      return { thread: existingThread, alreadyExisted: true };
    }

    const thread = new MessageThreadEntity();
    thread.subject = threadSubject(opp.title);
    thread.opportunityId = opportunityId;
    thread.applicantEmail = applicant.email;
    thread.applicantName = applicant.name;
    thread.applicantUserId = applicant.userId;
    thread.applicantInboxId = uniqueId();
    thread.posterInboxId = uniqueId();
    thread.createdAt = Instant.now().epochSecond();

    await this.threads.save(thread);
    return { thread, alreadyExisted: false };
  }

  /**
   * @param bccSender Should you bcc the actual sender's email on this message.
   * This is for letting them know that they successfully sent a message when a thread is started.
   */
  async sendMessage(
    recipientInboxId: string,
    senderEmailAddress: string,
    body: string,
    options: MessageOptions = { bccSender: false }
  ): Promise<void> {
    const [toPoster, toApplicant, messagesLastHour] = await Promise.all([
      this.threads.findOne({
        where: { posterInboxId: recipientInboxId },
        relations: { opportunity: true },
      }),
      this.threads.findOne({
        where: { applicantInboxId: recipientInboxId },
        relations: { opportunity: true },
      }),
      this.messages.countBy({
        recipientInboxId,
        sentAt: MoreThan(
          Instant.now().minus(Duration.ofHours(1)).epochSecond()
        ),
      }),
    ]);

    if (messagesLastHour > MAX_MESSAGES_PER_HOUR) {
      throw new BadRequestException(
        `Cannot send more than ${MAX_MESSAGES_PER_HOUR} to an inbox`
      );
    }

    let thread: MessageThreadEntity;
    if (toPoster !== null) {
      thread = toPoster;
    } else if (toApplicant !== null) {
      thread = toApplicant;
    } else {
      throw new NotFoundException(`Inbox ID does not exist`);
    }

    const message = new MessageEntity();
    message.messageId = uniqueId();
    message.recipientInboxId = recipientInboxId;
    message.senderEmailAddress = senderEmailAddress;
    message.sentAt = Instant.now().epochSecond();
    await this.messages.save(message);

    const sentByApplicant = toPoster !== null;
    const senderInboxId = sentByApplicant
      ? thread.applicantInboxId
      : thread.posterInboxId;
    const senderName = sentByApplicant
      ? thread.applicantName
      : thread.opportunity!.contactName;
    const recipientEmail = sentByApplicant
      ? thread.opportunity!.contactEmail
      : thread.applicantEmail;
    const recipientName = sentByApplicant
      ? thread.opportunity!.contactName
      : thread.applicantName;

    await this.email.send({
      text: body,
      subject: thread.subject,
      fromInbox: senderInboxId,
      fromName: senderName,
      to: {
        name: recipientName,
        address: recipientEmail,
      },
      ...(options.bccSender && {
        bcc: { name: senderName, address: senderEmailAddress },
      }),
    });
  }
}
