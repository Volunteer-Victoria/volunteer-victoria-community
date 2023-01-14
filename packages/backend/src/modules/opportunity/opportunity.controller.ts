import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CustomNotFoundException, RequireAuth } from "../../util";
import { User, UserInfo } from "../auth/auth.module";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
} from "./opportunity.dto";
import { OpportunityService } from "./opportunity.service";
import type { Request } from "express";

@Controller("opportunity")
export class OpportunityController {
  constructor(private readonly service: OpportunityService) {}

  @Get()
  @ApiResponse({ type: [OpportunityResponseDto] })
  @ApiQuery({
    name: "minOccursDate",
    description: "The earliest date to return",
    required: false,
  })
  async get(
    @Query("minOccursDate") minOccursDate: string | null
  ): Promise<OpportunityResponseDto[]> {
    return this.service.findAll({
      minOccursDate: minOccursDate === null ? undefined : minOccursDate,
    });
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({ type: OpportunityResponseDto })
  @RequireAuth()
  async post(
    @Body() opp: OpportunityCreateDto,
    @User() user: UserInfo
  ): Promise<OpportunityResponseDto> {
    return this.service.create(opp, user);
  }

  @Post("fake")
  @HttpCode(201)
  @ApiResponse({ type: [OpportunityResponseDto] })
  @ApiQuery({
    name: "count",
    type: String,
    description: "Number of fake opportunities to generate",
    required: false,
  })
  @RequireAuth()
  async postFake(
    @User() user: UserInfo,
    @Query("count") count: number
  ): Promise<OpportunityResponseDto[]> {
    const result = [];
    for (let i = 0; i < (Number.isNaN(count) ? 1 : count); i++) {
      result.push(await this.service.createFake(user));
    }
    return result;
  }

  @Get(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  async getId(@Param("id") id: string): Promise<OpportunityResponseDto> {
    const opp = await this.service.findOne(id);
    if (opp === null) {
      throw new CustomNotFoundException();
    } else {
      return opp;
    }
  }

  @Put(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  @RequireAuth()
  async putId(
    @Param("id") id: string,
    @Body() values: OpportunityCreateDto,
    @User() user: UserInfo
  ): Promise<OpportunityResponseDto> {
    const opp = await this.service.update(id, values, user);
    if (opp === null) {
      throw new CustomNotFoundException();
    } else {
      return opp;
    }
  }

  @Delete()
  @ApiOperation({ summary: "Delete all opportunities" })
  @RequireAuth()
  async deleteAll(@User() user: UserInfo): Promise<void> {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    await this.service.deleteAll();
  }

  @Delete(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  @RequireAuth()
  async deleteId(
    @Param("id") id: string,
    @User() user: UserInfo
  ): Promise<OpportunityResponseDto> {
    const opp = await this.service.delete(id, user);
    if (opp === null) {
      throw new CustomNotFoundException();
    } else {
      return opp;
    }
  }
}
