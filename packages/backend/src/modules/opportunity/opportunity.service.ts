import { Instant } from "@js-joda/core";
import { Injectable } from "@nestjs/common";
import assert from "assert";
import { transformAndValidate, uniqueId } from "../../util";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
} from "./opportunity.dto";
import { OpportunityEntity } from "./opportunity.entity";

@Injectable()
export class OpportunityService {
  readonly opportunities;

  constructor(entity: OpportunityEntity) {
    this.opportunities = entity.value;
  }

  private async findById(id: string): Promise<any | undefined> {
    const opp = await this.opportunities.query(id);
    if (opp.Items === undefined || opp.Items.length === 0) {
      return undefined;
    } else {
      assert(opp.Items.length === 1);
      return opp.Items[0];
    }
  }

  async findAll(): Promise<OpportunityResponseDto[]> {
    const raw = await this.opportunities.scan();
    return transformAndValidate(OpportunityResponseDto, raw.Items!);
  }

  async findOne(id: string): Promise<OpportunityResponseDto | undefined> {
    const opp = await this.findById(id);
    if (opp === undefined) {
      return undefined;
    } else {
      return transformAndValidate(OpportunityResponseDto, opp);
    }
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

  async update(
    id: string,
    values: OpportunityCreateDto
  ): Promise<OpportunityResponseDto | undefined> {
    const opp = await this.findById(id);
    if (opp === undefined) {
      return undefined;
    } else {
      const { postedTime, opportunityId, postedByUserId } = opp;
      const updated = await transformAndValidate(OpportunityResponseDto, {
        ...values,
        postedTime,
        opportunityId,
        postedByUserId,
      });
      await this.opportunities.put(updated);
      return updated;
    }
  }

  async delete(id: string): Promise<OpportunityResponseDto | undefined> {
    const opp = await this.findById(id);
    if (opp === undefined) {
      return undefined;
    } else {
      const { opportunityId, postedTime } = opp;
      await this.opportunities.delete({ opportunityId, postedTime });
      return transformAndValidate(OpportunityResponseDto, opp);
    }
  }
}
