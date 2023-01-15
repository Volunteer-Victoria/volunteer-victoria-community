import { INestApplication, Module } from "@nestjs/common";
import { createNestApp } from "../../app";
import supertest from "supertest";
import { RootController } from "./root.controller";
import { AuthTestModule, MockJwksProvider } from "../auth/auth.test.module";

@Module({
  controllers: [RootController],
  imports: [AuthTestModule],
})
class RootTestModule {}

describe("/", () => {
  let app: INestApplication;
  let api: supertest.SuperTest<supertest.Test>;
  let auth: MockJwksProvider;
  let headers: Record<string, string>;

  beforeAll(async () => {
    app = (await createNestApp(RootTestModule, "")).nestApp;
    api = supertest(app.getHttpServer());
    auth = app.get(MockJwksProvider);
    auth.makeAdmin();
    headers = auth.authHeaders();
  });

  it("GET /debug requires admin", async () => {
    await api.get("/debug?statusCode=500").expect(401);
  });

  it("GET /debug returns provided status codes", async () => {
    await api.get("/debug?statusCode=418").set(headers).expect(418);
    await api.get("/debug?statusCode=202").set(headers).expect(202);
    await api.get("/debug?statusCode=503").set(headers).expect(503);
  });

  it("GET /debug?statusCode=666 throws an internal error", async () => {
    await api.get("/debug?statusCode=666").set(headers).expect(500);
  });

  afterAll(async () => {
    await app.close();
  });
});
