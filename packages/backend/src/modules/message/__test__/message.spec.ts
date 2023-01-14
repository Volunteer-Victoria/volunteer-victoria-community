import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import assert from "assert";
import { readFileSync } from "fs";
import type { Source } from "mailparser";
import supertest from "supertest";
import { setupNestApp } from "../../../app";
import { UserInfo } from "../../auth/auth.module";
import { AuthTestModule, MockJwksProvider } from "../../auth/auth.test.module";
import { InMemoryDbModule } from "../../db/db.module";
import type { OpportunityResponseDto } from "../../opportunity/opportunity.dto";
import { OpportunityModule } from "../../opportunity/opportunity.module";
import { OpportunityService } from "../../opportunity/opportunity.service";
import {
  EmailService,
  SESTransportFactory,
  SESTransportService,
} from "../email.service";
import { MessageController } from "../message.controller";
import { MessageEntity } from "../message.entity";
import { MessageService } from "../message.service";
import { MessageThreadEntity } from "../thread.entity";

const sentEmails: any[] = [];

const transportTestService = {
  async sendMail(email: any): Promise<void> {
    sentEmails.push(email);
  },
};

const posterUser: UserInfo = new UserInfo(
  "test-poster",
  ["admin"],
  "poster@mail.com"
);

const path = "/message";
const emailDomain = "fake.community.vvc";
const emailSourceTemplate = readFileSync(
  "./src/modules/message/__test__/ses-received-email-1.txt"
).toString();
const emailTemplateBody = "Hi Person,\nHello.\n\n\nBye,\nWill S";

function generateRawEmail(fromAddress: string, toAddress: string): Source {
  return emailSourceTemplate
    .replaceAll("test@mail.com", fromAddress)
    .replaceAll("testemail@dev.community.volunteervictoria.bc.ca", toAddress);
}

// TODO test the format of a reply to make sure we strip the previous messages

describe(path, () => {
  let headers: Record<string, string>;
  let api: supertest.SuperTest<supertest.Test>;
  let auth: MockJwksProvider;
  let opportunity: OpportunityResponseDto;
  let oppPath: string;
  let messages: MessageService;

  beforeAll(async () => {
    // TODO use ConfigModule and mock properly
    process.env["EMAIL_DOMAIN"] = emailDomain;

    const moduleRef = await Test.createTestingModule({
      imports: [
        InMemoryDbModule,
        AuthTestModule,
        TypeOrmModule.forFeature([MessageThreadEntity]),
        TypeOrmModule.forFeature([MessageEntity]),
        OpportunityModule,
      ],
      providers: [MessageService, EmailService, SESTransportFactory],
      controllers: [MessageController],
    })
      .overrideProvider(SESTransportService)
      .useValue(transportTestService)
      .compile();

    const app = moduleRef.createNestApplication();
    setupNestApp(app);
    await app.init();

    api = supertest(app.getHttpServer());
    auth = app.get(MockJwksProvider);
    headers = auth.authHeaders();

    // Create an initial opp to have conversations about
    const opps = app.get(OpportunityService);
    opportunity = await opps.createFake(posterUser);
    oppPath = `${path}?opportunityId=${opportunity.opportunityId}`;

    messages = app.get(MessageService);
  });

  it("POST should start a new thread", async () => {
    expect(sentEmails.length).toBe(0);

    const applicantName = "Applicant Name";
    const message = "Test Message";
    await api
      .post(oppPath)
      .set(headers)
      .send({ applicantName, message })
      .expect(201);

    expect(sentEmails.length).toBe(1);
    const email = sentEmails[0]!;
    expect(email.text).toBe(message);
    expect(email.to).toEqual({
      name: opportunity.contactName,
      address: opportunity.contactEmail,
    });
    expect(email.from).toEqual({
      name: applicantName,
      address: `${(email.from.address as string).substring(
        0,
        21
      )}@${emailDomain}`,
    });
    expect(email.bcc).toEqual({
      name: applicantName,
      address: auth.email,
    });
    expect(email.subject).toBe(opportunity.title);
  });

  it("POSTing to an existing thread should return a 200", async () => {
    const originalApplicantName = "Applicant Name";
    const applicantName = "New Applicant Name";
    const message = "Test Message 2";
    await api
      .post(oppPath)
      .set(headers)
      .send({ applicantName, message })
      .expect(200);

    expect(sentEmails.length).toBe(2);
    expect(sentEmails[1]!.from.name).toBe(originalApplicantName);
    expect(sentEmails[1]!.bcc.name).toBe(originalApplicantName);
  });

  it("POSTing requires auth", async () => {
    await api
      .post(oppPath)
      .send({ applicantName: "test", message: "test" })
      .expect(401);
  });

  it("POSTing requires all fields", async () => {
    await api.post(oppPath).set(headers).expect(400);
    await api.post(oppPath).set(headers).set({ message: "test" }).expect(400);
  });

  it("can't start a thread with yourself", async () => {
    const applicantUserId = auth.userId;
    auth.userId = posterUser.id;
    await api
      .post(oppPath)
      .set(auth.authHeaders())
      .send({ applicantName: "test", message: "test" })
      .expect(400);
    auth.userId = applicantUserId;
  });

  it("replying to an email forwards it onto the inbox owner", async () => {
    expect(sentEmails.length).toBe(2);
    const thread = await messages.getThread(
      opportunity.opportunityId,
      auth.userId
    );
    expect(thread).not.toBeNull();
    assert(thread !== null);

    const replyMail1 = generateRawEmail(
      "test@testemail123.com",
      sentEmails[0].from.address
    );
    await messages.receiveMail(replyMail1);

    expect(sentEmails.length).toBe(3);
    const reply1 = sentEmails[2]!;
    expect(reply1.text).toBe(emailTemplateBody);
    expect(reply1.subject).toBe(opportunity.title);
    expect(reply1.to).toEqual({
      name: "Applicant Name",
      address: auth.email,
    });
    expect(reply1.from).toEqual({
      name: opportunity.contactName,
      address: `${thread.posterInboxId}@${emailDomain}`,
    });
    expect(reply1.bcc).toBeUndefined();

    const replyMail2 = generateRawEmail(
      "notimportant@fake.fake",
      sentEmails[2]!.from.address
    );
    await messages.receiveMail(replyMail2);

    expect(sentEmails.length).toBe(4);
    const reply2 = sentEmails[3]!;
    expect(reply2.text).toBe(emailTemplateBody);
    expect(reply2.subject).toBe(opportunity.title);
    expect(reply2.to).toEqual({
      name: opportunity.contactName,
      address: opportunity.contactEmail,
    });
    expect(reply2.from).toEqual({
      name: thread.applicantName,
      address: `${thread.applicantInboxId}@${emailDomain}`,
    });
    expect(reply2.bcc).toBeUndefined();
  });
});
