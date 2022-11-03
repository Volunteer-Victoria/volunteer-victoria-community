import { Instant } from "@js-joda/core";
import { Injectable } from "@nestjs/common";
import { transformAndValidate, uniqueId } from "../../util";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
  OpportunitySummaryResponseDto,
} from "./opportunity.dto";
import { OpportunityEntity } from "./opportunity.entity";

@Injectable()
export class OpportunityService {
  readonly opportunities;

  constructor(entity: OpportunityEntity) {
    this.opportunities = entity.value;
  }

  async findAll(): Promise<OpportunitySummaryResponseDto[]> {
    const raw = await this.opportunities.scan();
    return transformAndValidate(OpportunitySummaryResponseDto, raw.Items!);
  }

  async create(values: OpportunityCreateDto): Promise<OpportunityResponseDto> {
    const opp = {
      ...values,
      opportunityId: uniqueId(),
      postedTime: Instant.now().epochSecond(),
      postedByUserId: "none",
    };
    const resp = await transformAndValidate(OpportunityResponseDto, opp);
    await this.opportunities.put(resp);
    return opp;
  }
}
