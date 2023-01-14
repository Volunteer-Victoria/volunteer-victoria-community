import {
  Controller,
  Get,
  HttpException,
  Query,
  Req,
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
    throw new HttpException({ message: "debug status code" }, statusCode);
  }
}
