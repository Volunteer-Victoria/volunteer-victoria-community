import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
  OpportunitySummaryResponseDto,
} from "./opportunity.dto";
import { OpportunityService } from "./opportunity.service";

@Controller("opportunity")
export class OpportunityController {
  constructor(private readonly service: OpportunityService) {}

  @Get()
  @ApiResponse({ type: [OpportunitySummaryResponseDto] })
  async get(): Promise<OpportunitySummaryResponseDto[]> {
    return this.service.findAll();
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({ type: OpportunityResponseDto })
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
      throw new NotFoundException();
    } else {
      return opp;
    }
  }

  @Put(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  async putId(
    @Param("id") id: string,
    @Body() values: OpportunityCreateDto
  ): Promise<OpportunityResponseDto> {
    const opp = await this.service.update(id, values);
    if (opp === undefined) {
      throw new NotFoundException();
    } else {
      return opp;
    }
  }

  @Delete(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  async deleteId(@Param("id") id: string): Promise<OpportunityResponseDto> {
    const opp = await this.service.delete(id);
    if (opp === undefined) {
      throw new NotFoundException();
    } else {
      return opp;
    }
  }
}
