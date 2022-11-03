import { Injectable } from "@nestjs/common";
import type { DocumentClient } from "aws-sdk/clients/dynamodb";
import { plainToInstance } from "class-transformer";
import { uniqueId } from "../../util";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
} from "./opportunity.dto";
import { OpportunityEntity } from "./opportunity.entity";
import { Instant } from "@js-joda/core";

@Injectable()
export class OpportunityService {
  readonly opportunities;

  constructor(entity: OpportunityEntity) {
    this.opportunities = entity.value;
  }

  async findAll(): Promise<OpportunityResponseDto[]> {
    const raw = await this.opportunities.scan();
    return plainToInstance<OpportunityResponseDto, DocumentClient.AttributeMap>(
      OpportunityResponseDto,
      raw.Items!
    );
  }

  async create(values: OpportunityCreateDto): Promise<OpportunityResponseDto> {
    const opp = {
      ...values,
      opportunityId: uniqueId(),
      postedTime: Instant.now().epochSecond(),
      postedByUserId: "none",
    };
    const resp = plainToInstance(OpportunityResponseDto, opp);
    await this.opportunities.put(resp);
    return resp;
  }
}
