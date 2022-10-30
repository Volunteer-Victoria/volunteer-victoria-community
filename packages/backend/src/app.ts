import express from "express";
import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import { AppModule } from "./modules/app.module";
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

const API_PREFIX = "/api/v1";

interface App {
  expressApp: express.Express;
  nestApp: NestExpressApplication;
  openapiDocument: OpenAPIObject;
}

export async function createNestApp(): Promise<App> {
  const expressApp = express();

  const nestApp = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp)
  );

  nestApp.setGlobalPrefix(API_PREFIX);

  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Volunteer Victoria - Community")
    .setVersion("1.0")
    .build();
  const openapiDocument = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup(API_PREFIX, nestApp, openapiDocument);

  await nestApp.init();
  return { expressApp, nestApp, openapiDocument };
}
