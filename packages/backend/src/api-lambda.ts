import serverlessExpress from "@vendia/serverless-express";
import type { APIGatewayProxyHandler } from "aws-lambda";
import { createNestApp } from "./app";
import { AppModule } from "./modules/app.module";

const { expressApp } = await createNestApp(AppModule);
export const handler: APIGatewayProxyHandler = serverlessExpress({
  app: expressApp,
});
