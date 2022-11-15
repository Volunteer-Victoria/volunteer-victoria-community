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
import { ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CustomNotFoundException, RequireAuth } from "../../util";
import { AuthenticatedRequest, isAdmin, userId } from "../auth/auth.module";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
} from "./opportunity.dto";
import { OpportunityService } from "./opportunity.service";

@Controller("opportunity")
export class OpportunityController {
  constructor(private readonly service: OpportunityService) {}

  @Get()
  @ApiResponse({ type: [OpportunityResponseDto] })
  async get(): Promise<OpportunityResponseDto[]> {
    return this.service.findAll();
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({ type: OpportunityResponseDto })
  @RequireAuth()
  async post(
    @Body() opp: OpportunityCreateDto,
    @Req() request: AuthenticatedRequest
  ): Promise<OpportunityResponseDto> {
    return this.service.create(opp, userId(request));
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
    @Req() request: AuthenticatedRequest,
    @Query("count") count: number
  ): Promise<OpportunityResponseDto[]> {
    const result = [];
    for (let i = 0; i < (Number.isNaN(count) ? 1 : count); i++) {
      result.push(await this.service.createFake(request));
    }
    return result;
  }

  @Get(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  async getId(@Param("id") id: string): Promise<OpportunityResponseDto> {
    const opp = await this.service.findOne(id);
    if (opp === undefined) {
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
    @Req() request: AuthenticatedRequest
  ): Promise<OpportunityResponseDto> {
    const opp = await this.service.update(id, values, request);
    if (opp === undefined) {
      throw new CustomNotFoundException();
    } else {
      return opp;
    }
  }

  @Delete("everything")
  @RequireAuth()
  async deleteAll(@Req() request: AuthenticatedRequest): Promise<void> {
    if (!isAdmin(request)) {
      throw new UnauthorizedException();
    }
    const opps = await this.service.findAll();
    await this.service.deleteAll(opps.map((opp) => opp.opportunityId));
  }

  @Delete(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  @RequireAuth()
  async deleteId(
    @Param("id") id: string,
    @Req() request: AuthenticatedRequest
  ): Promise<OpportunityResponseDto> {
    const opp = await this.service.delete(id, request);
    if (opp === undefined) {
      throw new CustomNotFoundException();
    } else {
      return opp;
    }
  }
}
