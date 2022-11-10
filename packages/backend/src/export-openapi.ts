import dotenv from "dotenv";
dotenv.config({ path: ".local.env" });

import { VVCModule } from "./modules/vvc.module";
import { createNestApp } from "./app";
import yaml from "yaml";
import fs from "fs/promises";

async function main() {
  const { openapiDocument } = await createNestApp(VVCModule);
  await fs.writeFile("../../openapi.yml", yaml.stringify(openapiDocument));
}
main();
