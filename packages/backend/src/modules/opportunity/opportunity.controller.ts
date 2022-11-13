import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { CustomNotFoundException, RequireAuth } from "../../util";
import { AuthenticatedRequest, isAdmin, userId } from "../auth/auth.module";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
} from "./opportunity.dto";
import { OpportunityService } from "./opportunity.service";

function assertCanEdit(
  opp: OpportunityResponseDto,
  request: AuthenticatedRequest
): void {
  if (!isAdmin(request) && opp.postedByUserId !== userId(request)) {
    throw new UnauthorizedException();
  }
}

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
    const opp = await this.service.update(id, values);
    if (opp === undefined) {
      throw new CustomNotFoundException();
    } else {
      assertCanEdit(opp, request);
      return opp;
    }
  }

  @Delete(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  @RequireAuth()
  async deleteId(
    @Param("id") id: string,
    @Req() request: AuthenticatedRequest
  ): Promise<OpportunityResponseDto> {
    const opp = await this.service.delete(id);
    if (opp === undefined) {
      throw new CustomNotFoundException();
    } else {
      assertCanEdit(opp, request);
      return opp;
    }
  }
}
