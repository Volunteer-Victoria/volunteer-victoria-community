import { Injectable } from "@nestjs/common";
import { SES } from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";
import { timeStamp } from "console";

interface Email {
  /** The inbox name to send from. Emails will come from <fromInbox>@domain.com */
  fromInbox: string;
  /** The name to be sent from */
  fromName: string;
  /** Comma separated list or an array of recipients e-mail addresses that will appear on the To: field */
  to: string | Array<string>;
  /** Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field */
  cc?: string | Array<string>;
  /** Comma separated list or an array of recipients e-mail addresses that will appear on the Bcc: field */
  bcc?: string | Array<string>;
  /** Comma separated list or an array of e-mail addresses that will appear on the Reply-To: field */
  replyTo?: string | Array<string>;
  /** The subject of the e-mail */
  subject?: string;
  /** The plaintext version of the message */
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly transporter;
  private readonly domain;

  constructor() {
    this.transporter = nodemailer.createTransport({
      SES: new SES({}),
    });
    this.domain = process.env["EMAIL_DOMAIN"]!;
  }

  async send(email: Email): Promise<void> {
    const from = `<${email.fromName}> ${email.fromInbox}@${this.domain}`;
    await this.transporter.sendMail({
      ...email,
      from,
      replyTo: from,
    });
  }
}
