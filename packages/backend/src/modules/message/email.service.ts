import { Inject, Injectable } from "@nestjs/common";
import { SES } from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";
import type { Address } from "nodemailer/lib/mailer";
import type SESTransport from "nodemailer/lib/ses-transport";

export interface Email {
  fromInbox: string;
  fromName: string;
  to: Address | Array<Address>;
  bcc?: Address | Array<Address>;
  subject: string;
  text: string;
}

export const SESTransportService = "SESTransport";

export const SESTransportFactory = {
  provide: SESTransportService,
  useFactory: async () => {
    return nodemailer.createTransport({
      SES: new SES({}),
    });
  },
};

@Injectable()
export class EmailService {
  readonly domain;

  constructor(
    @Inject(SESTransportService)
    private readonly transporter: nodemailer.Transporter<SESTransport.SentMessageInfo>
  ) {
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
