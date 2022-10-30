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
import { uniqueId } from "../../util";
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
  findAll(): OpportunitySummaryResponseDto[] {
    return [];
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({ type: OpportunityResponseDto })
  create(@Body() opp: OpportunityCreateDto): OpportunityResponseDto {
    const id = uniqueId();
    const result = new OpportunityResponseDto();
    Object.assign(result, opp);
    result.opportunityId = id;
    return result;
  }

  @Get(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  findOne(@Param("id") id: string): OpportunityResponseDto {
    const result = new OpportunityResponseDto();
    result.opportunityId = id;
    return result;
  }

  @Put(":id")
  @ApiResponse({ type: OpportunityResponseDto })
  update(
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
  delete(@Param("id") id: string): OpportunityResponseDto {
    const result = new OpportunityResponseDto();
    result.opportunityId = id;
    return result;
  }
}
