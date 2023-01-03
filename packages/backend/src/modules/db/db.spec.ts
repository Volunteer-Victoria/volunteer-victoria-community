import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenericContainer } from "testcontainers";
import { createNestApp } from "../../app";

const COCKROACH_IMAGE = "cockroachdb/cockroach:v22.2.1";
const COCKROACH_PORT = 26257;

describe("Database Module", () => {
  it("should successfully connect and run migrations", async () => {
    const cockroachContainer = await new GenericContainer(COCKROACH_IMAGE)
      .withExposedPorts(COCKROACH_PORT)
      .withCommand(["start-single-node", "--insecure"])
      .start();

    const port = cockroachContainer.getMappedPort(COCKROACH_PORT);
    console.log(`Started CockroachDB container at localhost:${port}`);

    process.env["DB_HOST"] = "localhost";
    process.env["DB_PORT"] = `${port}`;
    process.env["DB_USERNAME"] = "root";
    process.env["DB_PASSWORD"] = undefined;
    process.env["DB_DATABASE"] = "defaultdb";

    const { DbModule, entities } = require("./db.module");
    @Module({
      imports: [DbModule, TypeOrmModule.forFeature(entities)],
    })
    class DbTestModule {}

    const app = (await createNestApp(DbTestModule, "")).nestApp;
    // Migrations should run on start-up so this is all we need to test

    await Promise.all([app.close(), cockroachContainer.stop()]);
  });
});
