import { GenericContainer } from "testcontainers";
import { createNestApp } from "../app";
import { OpportunityService } from "./opportunity/opportunity.service";
import { VVCModule } from "./vvc.module";
import { Client } from "pg";

const COCKROACH_IMAGE = "cockroachdb/cockroach:v22.2.1";
const COCKROACH_PORT = 26257;

describe("VVC module", () => {
  it("should successfully start, connect to the database, and run migrations", async () => {
    const cockroachContainer = await new GenericContainer(COCKROACH_IMAGE)
      .withExposedPorts(COCKROACH_PORT)
      .withCommand(["start-single-node", "--insecure"])
      .start();

    const port = cockroachContainer.getMappedPort(COCKROACH_PORT);
    console.log(`Started CockroachDB container at localhost:${port}`);

    // TODO use ConfigService
    process.env["DB_HOST"] = "localhost";
    process.env["DB_PORT"] = `${port}`;
    process.env["DB_USERNAME"] = "root";
    process.env["DB_PASSWORD"] = undefined;
    process.env["DB_DATABASE"] = "defaultdb";

    const app = (await createNestApp(VVCModule, "")).nestApp;

    const client = new Client({
      user: "root",
      host: "localhost",
      port,
      database: "defaultdb",
    });
    await client.connect();
    const res = await client.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name='opportunity'"
    );
    for (const row of res.rows) {
      console.dir(row);
    }

    const oppService = app.get(OpportunityService);
    const opps = await oppService.findAll({});
    expect(opps).toEqual([]);
    await Promise.all([app.close(), cockroachContainer.stop()]);
  });
});
