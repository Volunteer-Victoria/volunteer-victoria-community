import { Injectable } from "@nestjs/common";
import { SES } from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";
import type { Address } from "nodemailer/lib/mailer";

interface Email {
  fromInbox: string;
  fromName: string;
  to: Address | Array<Address>;
  cc?: Address | Array<Address>;
  subject: string;
  text: string;
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
    const from: Address = {
      name: email.fromName,
      address: `${email.fromInbox}@${this.domain}`,
    };
    await this.transporter.sendMail({
      ...email,
      from,
    });
  }
}
