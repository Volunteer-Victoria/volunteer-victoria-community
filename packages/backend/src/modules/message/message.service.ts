import { Duration, Instant } from "@js-joda/core";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import assert from "assert";
import { convert } from "html-to-text";
import {
  AddressObject,
  EmailAddress,
  ParsedMail,
  simpleParser,
  Source,
} from "mailparser";
import type { Repository } from "typeorm";
import { MoreThan } from "typeorm";
import { uniqueId } from "../../util";
import { OpportunityService } from "../opportunity/opportunity.service";
import { EmailService } from "./email.service";
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

function messageAsPlaintext(mail: ParsedMail): string {
  if (mail.html === false) {
    assert(mail.text !== undefined, "No email body found");
    return mail.text.trim();
  } else {
    return convert(mail.html, {
      selectors: [
        {
          selector: "img",
          format: "skip",
        },
      ],
    }).trim();
  }
}

function flattenAddresses(
  addresses: AddressObject | AddressObject[] | undefined
): string[] {
  const result = [] as string[];

  if (addresses === undefined) {
    return [];
  } else if (!(addresses instanceof Array)) {
    addresses = [addresses];
  }

  function pushAddr({ address, group }: EmailAddress) {
    if (address !== undefined) {
      result.push(address);
    } else if (group !== undefined) {
      for (const addr of group) {
        pushAddr(addr);
      }
    }
  }

  for (const addr of addresses) {
    for (const val of addr.value) {
      pushAddr(val);
    }
  }

  return result;
}

async function parseRawMail(raw: Source): Promise<{
  text: string;
  to: string[];
  from: string;
}> {
  const mail = await simpleParser(raw);
  const text = messageAsPlaintext(mail);
  const to = flattenAddresses(mail.to);
  const [from] = flattenAddresses(mail.from);
  assert(from !== undefined);
  return {
    text,
    to,
    from,
  };
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

  async getThread(
    opportunityId: string,
    applicantUserId: string
  ): Promise<MessageThreadEntity | null> {
    return this.threads.findOneBy({
      opportunityId,
      applicantUserId: applicantUserId,
    });
  }

  /**
   * @returns New thread if one has been created, and the existing thread if one already exists.
   */
  async startThread(
    opportunityId: string,
    applicant: { name: string; email: string; userId: string }
  ): Promise<{ thread: MessageThreadEntity; alreadyExisted: boolean }> {
    const [opp, existingThread] = await Promise.all([
      this.opportunities.findOne(opportunityId),
      this.getThread(opportunityId, applicant.userId),
    ]);

    if (opp === null) {
      throw new NotFoundException(`Opportunity ID does not exist`);
    } else if (opp.postedByUserId === applicant.userId) {
      throw new BadRequestException("Cannot start a thread with yourself");
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

  /** Called when we receive an email to one of the managed inboxes */
  async receiveMail(raw: Source): Promise<void> {
    const parsed = await parseRawMail(raw);
    assert(parsed.to.length > 0);
    console.dir(parsed);

    // Try to find the recipient if there are more than one in the "To" field
    const to = parsed.to.find((addr) => addr.endsWith(this.email.domain));
    assert(to !== undefined);
    assert(to.length === 21 + 1 + this.email.domain.length);
    const toInbox = to.substring(0, 21);

    await this.sendMessage(toInbox, parsed.from, parsed.text);
  }
}
