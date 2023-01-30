import serverlessExpress from "@vendia/serverless-express";
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Callback,
  Handler,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { createNestApp } from "./app";
import { AppModule } from "./modules/app.module";

const cachedHandler: Promise<Handler> = (async () => {
  const { expressApp } = await createNestApp(AppModule);
  return serverlessExpress({ app: expressApp });
})();

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): Promise<APIGatewayProxyResult> => {
  const handler = await cachedHandler;
  return handler(event, context, callback);
};
