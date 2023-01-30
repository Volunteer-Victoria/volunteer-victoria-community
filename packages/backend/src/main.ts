import dotenv from "dotenv";
import assert from "assert";

assert(process.env["NODE_ENV"] === "development");
dotenv.config({ path: ".local.env" });

import { createNestApp } from "./app";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const { nestApp } = await createNestApp(AppModule);
  nestApp.listen(3000);
}
bootstrap();
