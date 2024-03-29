import { Body, Controller, Post, Query, Res } from "@nestjs/common";
import { ApiQuery, ApiResponse } from "@nestjs/swagger";
import type { Response } from "express";
import { RequireAuth, User, UserInfo } from "../auth/auth.module";
import { ThreadStartDto } from "./message.dto";
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
    @Body() body: ThreadStartDto,
    @Query("opportunityId") opportunityId: string,
    @User() user: UserInfo,
    @Res() res: Response
  ): Promise<void> {
    const { applicantName, message } = body;
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
