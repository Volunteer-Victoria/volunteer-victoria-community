import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { CustomNotFoundException, RequireAuth } from "../../util";
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
    @Body() opp: OpportunityCreateDto
  ): Promise<OpportunityResponseDto> {
    return this.service.create(opp);
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
    @Body() values: OpportunityCreateDto
  ): Promise<OpportunityResponseDto> {
    const opp = await this.service.update(id, values);
    if (opp === undefined) {
      throw new CustomNotFoundException();
    } else {
      return opp;
    }
  }

  @Delete(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  @RequireAuth()
  async deleteId(@Param("id") id: string): Promise<OpportunityResponseDto> {
    const opp = await this.service.delete(id);
    if (opp === undefined) {
      throw new CustomNotFoundException();
    } else {
      return opp;
    }
  }
}
