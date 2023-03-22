// Needs a top-level await so is a separate .mjs file
import serverlessExpress from "@vendia/serverless-express";
import { createNestApp } from "./app.js";
import { AppModule } from "./modules/app.module.js";

const { expressApp } = await createNestApp(AppModule);
export const handler = serverlessExpress({ app: expressApp });
