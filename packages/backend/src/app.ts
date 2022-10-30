import express from "express";
import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import { AppModule } from "./modules/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const API_PREFIX = "/api/v1";

export async function createNestApp(): Promise<express.Express> {
  const app = express();

  const nestApp = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(app)
  );

  nestApp.setGlobalPrefix(API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle("Volunteer Victoria - Community")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup(API_PREFIX, nestApp, document);

  await nestApp.init();
  return app;
}
