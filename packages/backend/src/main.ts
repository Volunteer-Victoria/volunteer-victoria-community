import dotenv from "dotenv";
import assert from "assert";

assert(process.env["NODE_ENV"] === "development");
dotenv.config({ path: ".local.env" });

import { createNestApp } from "./app";
import { VVCModule } from "./modules/vvc.module";

async function bootstrap() {
  const { nestApp } = await createNestApp(VVCModule);
  nestApp.listen(3000);
}
bootstrap();
