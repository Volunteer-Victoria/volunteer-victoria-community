import dotenv from "dotenv";
dotenv.config({ path: ".local.env" });

import { AppModule } from "./modules/app.module";
import { createNestApp } from "./app";
import yaml from "yaml";
import fs from "fs/promises";

async function main() {
  const { openapiDocument } = await createNestApp(AppModule);
  await fs.writeFile("../../openapi.yml", yaml.stringify(openapiDocument));
}
main();
