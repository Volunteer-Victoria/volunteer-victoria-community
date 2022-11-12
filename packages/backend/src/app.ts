import express from "express";
import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

const API_PREFIX = "/api/v1";

interface App {
  expressApp: express.Express;
  nestApp: NestExpressApplication;
  openapiDocument: OpenAPIObject;
}

export async function createNestApp(
  module: any,
  urlPrefix: string = API_PREFIX
): Promise<App> {
  const expressApp = express();

  const nestApp = await NestFactory.create<NestExpressApplication>(
    module,
    new ExpressAdapter(expressApp)
  );

  nestApp.setGlobalPrefix(urlPrefix);

  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  nestApp.enableCors({
    origin: "http://localhost:3000",
  });

  const config = new DocumentBuilder()
    .setTitle("Volunteer Victoria - Community")
    .setVersion("1.0")
    .build();
  const openapiDocument = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup(API_PREFIX, nestApp, openapiDocument);

  await nestApp.init();
  return { expressApp, nestApp, openapiDocument };
}
