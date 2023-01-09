import { Injectable } from "@nestjs/common";

interface Email {
  recipientEmail: string;
  senderEmail: string;
  subject: string;
  body: string;
  replyToEmail?: string;
  cc: string[];
}

// This looks good: https://nodemailer.com/transports/ses/
// Also looks like we should use credential-provider-node

@Injectable()
export class EmailService {
  async send(email: Email): Promise<void> {}
}
