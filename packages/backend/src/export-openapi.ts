import { createNestApp } from "./app";
import yaml from "yaml";
import fs from "fs/promises";
import { VVCModule } from "./modules/vvc.module";

async function main() {
  const { openapiDocument } = await createNestApp(VVCModule);
  await fs.writeFile("../../openapi.yml", yaml.stringify(openapiDocument));
}
main();
