import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { Response } from "express";
import { isRunningInUnitTest } from "../util";

@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (!isRunningInUnitTest) {
      console.error(exception);
    }

    const res = host.switchToHttp().getResponse<Response>();
    if (exception instanceof HttpException) {
      let response;
      if (typeof exception.getResponse() === "string") {
        response = { message: exception.getResponse() };
      } else {
        response = exception.getResponse();
      }
      res.status(exception.getStatus()).json(response);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }
}
