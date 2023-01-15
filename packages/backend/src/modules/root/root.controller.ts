import {
  Controller,
  Get,
  HttpException,
  Query,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiOperation, ApiQuery } from "@nestjs/swagger";
import { RequireAuth } from "../../util";
import { User, UserInfo } from "../auth/auth.module";

@Controller()
export class RootController {
  @Get("debug")
  @ApiOperation({
    summary: "Return debug response for testing out e.g. alarms",
  })
  @ApiQuery({
    name: "statusCode",
    type: Number,
    required: true,
  })
  @RequireAuth()
  debug(@Query("statusCode") statusCode: number, @User() user: UserInfo): void {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    if (statusCode >= 600) {
      // Throw non-HttpExceptions to test generic exception handling
      throw new Error(statusCode.toString());
    } else {
      throw new HttpException({ message: "debug status code" }, statusCode);
    }
  }
}
