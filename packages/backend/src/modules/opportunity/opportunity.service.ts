import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { OpportunityResponseDto } from "./opportunity.dto";
import type { DocumentClient } from "aws-sdk/clients/dynamodb";
import type { OpportunityEntityProvider } from "./opportunity.entity";

@Injectable()
export class OpportunityService {
  readonly opportunities;

  constructor(entityProvider: OpportunityEntityProvider) {
    this.opportunities = entityProvider.entity;
  }

  async findAll(): Promise<OpportunityResponseDto[]> {
    const raw = await this.opportunities.scan();
    return plainToInstance<OpportunityResponseDto, DocumentClient.AttributeMap>(
      OpportunityResponseDto,
      raw.Items!
    );
  }
}
