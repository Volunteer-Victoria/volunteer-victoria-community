import express from "express";
import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import { AppModule } from "./app.module";

export async function createNestApp() {
  const app = express();
  const nestApp = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(app)
  );
  await nestApp.init();
  return app;
}
