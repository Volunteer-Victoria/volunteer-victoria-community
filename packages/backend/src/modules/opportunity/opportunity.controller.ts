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
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
  OpportunitySummaryResponseDto,
  OpportunityUpdateDto,
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
  getId(@Param("id") id: string): OpportunityResponseDto {
    const result = new OpportunityResponseDto();
    result.opportunityId = id;
    return result;
  }

  @Put(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  putId(
    @Param("id") id: string,
    @Body() opp: OpportunityUpdateDto
  ): OpportunityResponseDto {
    const result = new OpportunityResponseDto();
    Object.assign(result, opp);
    result.opportunityId = id;
    return result;
  }

  @Delete(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  deleteId(@Param("id") id: string): OpportunityResponseDto {
    const result = new OpportunityResponseDto();
    result.opportunityId = id;
    return result;
  }
}