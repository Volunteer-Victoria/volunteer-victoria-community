import { Body, Controller, Post, Query, Req, Res } from "@nestjs/common";
import { ApiQuery, ApiResponse } from "@nestjs/swagger";
import { RequireAuth } from "../../util";
import { User, UserInfo } from "../auth/auth.module";
import type { ThreadStartDto } from "./message.dto";
import type { Response } from "express";
import { MessageService } from "./message.service";

@Controller("message")
export class MessageController {
  constructor(private readonly messages: MessageService) {}

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
    @Body() { applicantName, message }: ThreadStartDto,
    @Query("opportunityId") opportunityId: string,
    @User() user: UserInfo,
    @Res() res: Response
  ): Promise<void> {
    const applicant = {
      name: applicantName,
      email: user.email,
      userId: user.id,
    };

    const { alreadyExisted, thread } = await this.messages.startThread(
      opportunityId,
      applicant
    );
    await this.messages.sendMessage(
      thread.posterInboxId,
      applicant.email,
      message,
      { bccSender: true }
    );

    if (alreadyExisted) {
      res.status(200).end();
    } else {
      res.status(201).end();
    }
  }
}
