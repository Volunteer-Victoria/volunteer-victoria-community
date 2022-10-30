import { createNestApp } from "./app";
import yaml from "yaml";
import fs from "fs/promises";

async function main() {
  const { openapiDocument } = await createNestApp();
  await fs.writeFile("../../openapi.yml", yaml.stringify(openapiDocument));
}
main();
