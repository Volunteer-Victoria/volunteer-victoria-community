import { ZonedDateTime } from "@js-joda/core";
import { INestApplication, Module } from "@nestjs/common";
import supertest from "supertest";
import { createNestApp } from "../../app";
import { AuthTestModule, MockJwksProvider } from "../auth/auth.test.module";
import { DynamoDBTestModule } from "../ddb/ddb.test.module";
import { OpportunityController } from "./opportunity.controller";
import { OpportunityEntity } from "./opportunity.entity";
import { OpportunityService } from "./opportunity.service";

@Module({
  controllers: [OpportunityController],
  providers: [OpportunityService, OpportunityEntity],
  imports: [DynamoDBTestModule, AuthTestModule],
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

const path = "/opportunity";

describe(path, () => {
  let app: INestApplication;
  let api: supertest.SuperTest<supertest.Test>;
  let headers: Record<string, string>;
  let oppId: string;

  beforeAll(async () => {
    app = (await createNestApp(OpportunityTestModule, "")).nestApp;
    api = supertest(app.getHttpServer());
    headers = app.get(MockJwksProvider).authHeaders();
  });

  it("GET should return empty at the start", async () => {
    const resp = await api.get(path).expect(200);
    expect(resp.body.length).toBe(0);
  });

  it("POST should create an object returned in GET and GET /{id}", async () => {
    const postResp = await api
      .post(path)
      .set(headers)
      .send(exampleOpp1)
      .expect(201);
    const postBody = postResp.body;

    oppId = postBody.opportunityId;
    expect(oppId.length).toBe(21);

    expect(postBody.postedTime).toBeDefined();
    expect(typeof postBody.postedTime).toBe("number");
    expect(postBody.postedByUserId).toBeDefined();
    for (const [k, v] of Object.entries(exampleOpp1)) {
      expect(postBody[k]).toBe(v);
    }

    const getResp = await api.get(path).expect(200);
    expect(getResp.body.length).toBe(1);
    const oppSummary = getResp.body[0];
    expect(oppSummary.opportunityId).toBe(oppId);
    expect(oppSummary.title).toBe(exampleOpp1.title);
    expect(oppSummary.description).toBe(exampleOpp1.description);

    const getIdResp = await api.get(`/opportunity/${oppId}`).expect(200);
    const opp = getIdResp.body;
    for (const [k, v] of Object.entries(postBody)) {
      expect(opp[k]).toBe(v);
    }
  });

  it("GET /{id} should 400 if object does not exist", async () => {
    await api.get(`${path}/notanid`).expect(400);
  });

  it("POST and PUT should 400 on bad input", async () => {
    await api
      .post(path)
      .set(headers)
      .send({ ...exampleOpp1, description: 3 })
      .expect(400);
    await api
      .post(path)
      .set(headers)
      .send({ ...exampleOpp1, startTime: null })
      .expect(400);
    await api
      .post(path)
      .set(headers)
      .send({ ...exampleOpp1, contactName: undefined })
      .expect(400);

    await api
      .put(`${path}/${oppId}`)
      .set(headers)
      .send({ ...exampleOpp1, description: 3 })
      .expect(400);
    await api
      .put(`${path}/${oppId}`)
      .set(headers)
      .send({ ...exampleOpp1, startTime: null })
      .expect(400);
    await api
      .put(`${path}/${oppId}`)
      .set(headers)
      .send({ ...exampleOpp1, contactName: undefined })
      .expect(400);
  });

  it("POST, PUT, DELETE should all require auth headers", async () => {
    await api.post(path).send(exampleOpp1).expect(401);

    await api.put(`${path}/${oppId}`).send(exampleOpp1).expect(401);

    await api.delete(`${path}/${oppId}`).expect(401);
  });

  it("PUT should update fields", async () => {
    const put1 = await api
      .put(`${path}/${oppId}`)
      .set(headers)
      .send({ ...exampleOpp1, description: "updated" })
      .expect(200);
    expect(put1.body.description).toBe("updated");
    const get1 = await api.get(`${path}/${oppId}`).expect(200);
    expect(get1.body.description).toBe("updated");
    expect(get1.body.locationName).toBe(exampleOpp1.locationName);
    expect(get1.body.idealVolunteer).toBeDefined();

    const newValues: Partial<typeof exampleOpp1> = { ...exampleOpp1 };
    delete newValues.idealVolunteer;
    await api.put(`${path}/${oppId}`).set(headers).send(newValues).expect(200);
    const get2 = await api.get(`${path}/${oppId}`).expect(200);
    expect(get2.body.description).toBe(exampleOpp1.description);
    expect(get2.body.idealVolunteer).toBeUndefined();
  });

  it("DELETE should remove an opp", async () => {
    const resp = await api.delete(`${path}/${oppId}`).set(headers).expect(200);
    expect(resp.body.opportunityId).toBe(oppId);

    const opps = await api.get(path).expect(200);
    expect(opps.body.length).toBe(0);

    await api.get(`${path}/${oppId}`).expect(400);
  });

  it("DELETE and PUT on an non-existent opp should 400", async () => {
    await api.delete(`${path}/fake`).set(headers).expect(400);
    await api.put(`${path}/fake`).set(headers).send(exampleOpp1).expect(400);
  });

  it("empty strings should not cause issues", async () => {
    await api
      .post(path)
      .set(headers)
      .send({
        title: "",
        contactName: "",
        requiredPeopleCount: 2,
        startTime: 0,
        endTime: 0,
        description: "",
        locationName: "",
        indoorsOrOutdoors: "indoors",
        criminalRecordCheckRequired: false,
      })
      .expect(201);

    await api.get(path).expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
