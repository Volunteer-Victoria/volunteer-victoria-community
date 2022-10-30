import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { uniqueId } from "src/util";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
  OpportunitySummaryResponseDto,
  OpportunityUpdateDto,
} from "./opportunity.dto";

@Controller("opportunity")
export class OpportunityController {
  @Get()
  @ApiResponse({ type: [OpportunitySummaryResponseDto] })
  getOpportunities(): OpportunitySummaryResponseDto[] {
    return [];
  }

  @Post()
  @ApiResponse({ type: OpportunityResponseDto })
  createOpportunity(@Body() opp: OpportunityCreateDto): OpportunityResponseDto {
    const id = uniqueId();
    const result = new OpportunityResponseDto();
    Object.assign(result, opp);
    result.opportunityId = id;
    return result;
  }

  @Get(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  getOpportunity(@Param("id") id: string): OpportunityResponseDto {
    const result = new OpportunityResponseDto();
    result.opportunityId = id;
    return result;
  }

  @Put(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  updateOpportunity(
    @Param("id") id: string,
    @Body() opp: OpportunityUpdateDto
  ): OpportunityResponseDto {
    const result = new OpportunityResponseDto();
    Object.assign(result, opp);
    result.opportunityId = id;
    return result;
  }
}
