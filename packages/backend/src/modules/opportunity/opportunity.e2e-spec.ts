import { INestApplication, Module } from "@nestjs/common";
import supertest from "supertest";
import { createNestApp } from "../../app";
import { DynamoDBTestModule } from "../ddb/ddb.test.module";
import { OpportunityController } from "./opportunity.controller";
import { OpportunityEntity } from "./opportunity.entity";
import { OpportunityService } from "./opportunity.service";
import { ZonedDateTime } from "@js-joda/core";
import type { OpportunityResponseDto } from "./opportunity.dto";

@Module({
  controllers: [OpportunityController],
  providers: [OpportunityService, OpportunityEntity],
  imports: [DynamoDBTestModule],
})
class OpportunityTestModule {}

const exampleOpp1 = {
  title: "My Opp",
  contactName: "Will",
  requiredPeopleCount: 3,
  startTime: ZonedDateTime.now().toEpochSecond(),
  endTime: ZonedDateTime.now().plusDays(1).toEpochSecond(),
  description: "volunteering",
  locationName: "my shed",
  indoorsOrOutdoors: "indoors",
  contactEmail: "test@email.com",
  contactPhone: "1234567890",
  criminalRecordCheckRequired: false,
  idealVolunteer: "large",
  additionalInformation: "large person pls",
};

describe("/opportunity", () => {
  let app: INestApplication;
  let api: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    app = (await createNestApp(OpportunityTestModule, "")).nestApp;
    api = supertest(app.getHttpServer());
  });

  it("GET should return empty at the start", async () => {
    const resp = await api.get("/opportunity").expect(200);
    expect(resp.body.length).toBe(0);
  });

  it("POST should create an object returned in GET and GET /{id}", async () => {
    const resp = await api.post("/opportunity").send(exampleOpp1).expect(201);
    const body = resp.body as OpportunityResponseDto;
    expect(body.opportunityId.length).toBe(21);
    expect(body.postedTime).toBeDefined();
    expect(body.postedByUserId).toBeDefined();
    for (const [k, v] of Object.entries(exampleOpp1)) {
      expect(body[k as keyof OpportunityResponseDto]).toBe(v);
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
