import { Test } from "@nestjs/testing";
import supertest from "supertest";
import { setupNestApp } from "../../app";
import { UserInfo } from "../auth/auth.module";
import { MockJwksProvider } from "../auth/auth.test.module";
import type { OpportunityResponseDto } from "../opportunity/opportunity.dto";
import { OpportunityService } from "../opportunity/opportunity.service";
import type { Email } from "./email.service";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";

const sentEmails: Array<Email> = [];

const emailTestService = {
  async send(email: Email): Promise<void> {
    sentEmails.push(email);
  },
};

const adminUser: UserInfo = new UserInfo(
  "test-admin",
  ["admin"],
  "test@mail.com"
);

describe("/message", () => {
  let headers;
  let api;
  let opportunity: OpportunityResponseDto;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        // InMemoryDbModule,
        // AuthTestModule,
        // TypeOrmModule.forFeature([MessageThreadEntity]),
        // TypeOrmModule.forFeature([MessageEntity]),
        // OpportunityModule,
      ],
      providers: [MessageService],
      controllers: [MessageController],
    }).compile();
    //   .overrideProvider(EmailService)
    //   .useValue(emailTestService)
    //   .compile();

    const app = moduleRef.createNestApplication();
    setupNestApp(app);
    await app.init();

    api = supertest(app.getHttpServer());
    const auth = app.get(MockJwksProvider);
    headers = auth.authHeaders();

    // Create an initial opp to have conversations about
    const opps = app.get(OpportunityService);
    opportunity = await opps.createFake(adminUser);
  });

  it("POST should start a new thread", async () => {});
});
