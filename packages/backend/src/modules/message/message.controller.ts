import {
  Body,
  Controller,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { ApiQuery, ApiResponse } from "@nestjs/swagger";
import { RequireAuth } from "../../util";
import type { AuthenticatedRequest } from "../auth/auth.module";
import type { ThreadStartDto } from "./message.dto";
import type { Response } from "express";

@Controller("message")
export class MessageController {
  @Post()
  @RequireAuth()
  @ApiQuery({
    name: "opportunityId",
    type: String,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "New message sent on existing thread",
  })
  @ApiResponse({
    status: 201,
    description: "New thread created and first message sent",
  })
  async post(
    @Body() body: ThreadStartDto,
    @Query("opportunityId") opportunityId: string,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Promise<void> {}
}
