import serverlessExpress from "@vendia/serverless-express";
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Callback,
  Handler,
} from "aws-lambda";
import { createNestApp } from "./app";

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const { expressApp } = await createNestApp();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): Promise<APIGatewayProxyResult> => {
  const cachedServer = await bootstrap();
  return cachedServer(event, context, callback);
};
