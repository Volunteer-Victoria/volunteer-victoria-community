import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { OpportunityResponseDto } from "./opportunity.dto";
import { OpportunityEntity } from "./opportunity.entity";
import type { DocumentClient } from "aws-sdk/clients/dynamodb";

@Injectable()
export class OpportunityService {
  async findAll(): Promise<OpportunityResponseDto[]> {
    const raw = await OpportunityEntity.scan();
    return plainToInstance<OpportunityResponseDto, DocumentClient.AttributeMap>(
      OpportunityResponseDto,
      raw.Items!
    );
  }
}
