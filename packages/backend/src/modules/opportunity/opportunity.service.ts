import { Duration, Instant, Period, ZonedDateTime } from "@js-joda/core";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { concatObjects, transformAndValidate, uniqueId } from "../../util";
import { AuthenticatedRequest, isAdmin, userId } from "../auth/auth.module";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
} from "./opportunity.dto";
import { DUMMY_VALUES, OpportunityEntity } from "./opportunity.entity";
import { faker } from "@faker-js/faker";
import random from "random";

function assertCanEdit(
  opp: OpportunityResponseDto,
  request: AuthenticatedRequest
): void {
  if (!isAdmin(request) && opp.postedByUserId !== userId(request)) {
    throw new UnauthorizedException();
  }
}

@Injectable()
export class OpportunityService {
  readonly opportunities;

  constructor(entity: OpportunityEntity) {
    this.opportunities = entity.value;
  }

  private async findById(id: string): Promise<any | undefined> {
    const opp = await this.opportunities.get({
      opportunityId: id,
      ...DUMMY_VALUES,
    });
    return opp.Item;
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

  async create(
    values: OpportunityCreateDto,
    postedByUserId: string
  ): Promise<OpportunityResponseDto> {
    const opp = {
      ...values,
      opportunityId: uniqueId(),
      postedTime: Instant.now().epochSecond(),
      postedByUserId,
    };
    const resp = await transformAndValidate(OpportunityResponseDto, opp);
    await this.opportunities.put({ ...DUMMY_VALUES, ...resp });
    return resp;
  }

  async update(
    id: string,
    values: OpportunityCreateDto,
    request: AuthenticatedRequest
  ): Promise<OpportunityResponseDto | undefined> {
    const opp = await this.findById(id);
    if (opp === undefined) {
      return undefined;
    } else {
      assertCanEdit(opp, request);
      const { postedTime, opportunityId, postedByUserId } = opp;
      const updated = await transformAndValidate(OpportunityResponseDto, {
        ...values,
        postedTime,
        opportunityId,
        postedByUserId,
      });
      await this.opportunities.put({ ...DUMMY_VALUES, ...updated });
      return updated;
    }
  }

  async delete(
    id: string,
    request: AuthenticatedRequest
  ): Promise<OpportunityResponseDto | undefined> {
    const opp = await this.findById(id);
    if (opp === undefined) {
      return undefined;
    } else {
      assertCanEdit(opp, request);
      const { opportunityId } = opp;
      await this.opportunities.delete({ opportunityId, ...DUMMY_VALUES });
      return transformAndValidate(OpportunityResponseDto, opp);
    }
  }

  async deleteAll(ids: string[]): Promise<void> {
    const requests = ids.map((opportunityId) =>
      this.opportunities.deleteBatch({ opportunityId, ...DUMMY_VALUES })
    );
    const request = { RequestItems: requests.reduce(concatObjects) };
    await this.opportunities.DocumentClient.batchWrite(request).promise();
  }

  async createFake(
    request: AuthenticatedRequest
  ): Promise<OpportunityResponseDto> {
    if (!isAdmin(request)) {
      throw new UnauthorizedException();
    }

    const startTime = ZonedDateTime.now().minusDays(random.int(-10, 10));
    const endTime = startTime.plusHours(random.int(0, 24));
    const fakeOpp = {
      title: faker.lorem.sentence(),
      contactName: faker.name.fullName(),
      requiredPeopleCount: random.int(0, 10),
      startTime: startTime.toEpochSecond(),
      endTime: endTime.toEpochSecond(),
      description: faker.lorem.paragraphs(random.int(1, 3)),
      locationName: faker.address.streetAddress(),
      indoorsOrOutdoors: ["indoors", "outdoors"][random.int(0, 1)]!,
      contactEmail: faker.internet.email(),
      contactPhone: faker.phone.number(),
      criminalRecordCheckRequired: random.bool(),
      idealVolunteer: faker.lorem.sentences(random.int(0, 4)),
      additionalInformation: faker.lorem.paragraphs(random.int(0, 2)),
    };
    return this.create(fakeOpp, userId(request));
  }
}
