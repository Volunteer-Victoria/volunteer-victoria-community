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
    .addBearerAuth({
      type: "oauth2",
      flows: {
        authorizationCode: {
          authorizationUrl: `${process.env["AUTH0_ISSUER_URL"]}authorize?audience=${process.env["AUTH0_AUDIENCE"]}`,
          tokenUrl: `${process.env["AUTH0_ISSUER_URL"]}oauth/token`,
          scopes: {
            openid: "Standard OpenID scope",
            profile: "Access to user profile information",
            email: "Access to user email",
          },
        },
      },
    })
    .build();
  const openapiDocument = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup(API_PREFIX, nestApp, openapiDocument, {
    swaggerOptions: {
      oauth2RedirectUrl: `${process.env["API_URL"]}/oauth2-redirect.html`,
      initOAuth: {
        clientId: process.env["AUTH0_CLIENT_ID"]!,
        scopes: ["openid", "profile", "email"],
      },
    },
  });

  await nestApp.init();
  return { expressApp, nestApp, openapiDocument };
}
