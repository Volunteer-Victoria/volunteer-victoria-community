import { faker } from "@faker-js/faker";
import { Duration, Instant, LocalDate } from "@js-joda/core";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import random from "random";
import type { Repository } from "typeorm";
import { MoreThanOrEqual } from "typeorm";
import {
  nullToUndefined,
  transformAndValidate,
  undefinedToNull,
  uniqueId,
} from "../../util";
import type { UserInfo } from "../auth/auth.module";
import {
  OpportunityCreateDto,
  OpportunityResponseDto,
} from "./opportunity.dto";
import { OpportunityEntity } from "./opportunity.entity";

function assertCanEdit(opp: OpportunityEntity, user: UserInfo): void {
  if (!user.isAdmin && opp.postedByUserId !== user.id) {
    throw new UnauthorizedException();
  }
}

@Injectable()
export class OpportunityService {
  constructor(
    @InjectRepository(OpportunityEntity)
    private readonly opportunities: Repository<OpportunityEntity>
  ) {}

  private async findById(
    opportunityId: string
  ): Promise<OpportunityEntity | null> {
    return this.opportunities.findOneBy({ opportunityId });
  }

  async findAll({
    minOccursDate,
  }: {
    minOccursDate?: string | undefined;
  }): Promise<OpportunityResponseDto[]> {
    let items;
    if (minOccursDate === undefined) {
      items = await this.opportunities.find();
    } else {
      items = await this.opportunities.findBy({
        occursDate: MoreThanOrEqual(minOccursDate),
      });
    }
    return transformAndValidate(OpportunityResponseDto, items);
  }

  async findOne(id: string): Promise<OpportunityResponseDto | null> {
    const opp = await this.findById(id);
    if (opp === null) {
      return null;
    } else {
      return transformAndValidate(OpportunityResponseDto, nullToUndefined(opp));
    }
  }

  async create(
    values: OpportunityCreateDto,
    user: UserInfo
  ): Promise<OpportunityResponseDto> {
    const opp = {
      ...values,
      opportunityId: uniqueId(),
      postedTime: Instant.now().epochSecond(),
      postedByUserId: user.id,
    };
    const resp = await transformAndValidate(OpportunityResponseDto, opp);
    await this.opportunities.insert(resp);
    return resp;
  }

  async update(
    id: string,
    values: OpportunityCreateDto,
    user: UserInfo
  ): Promise<OpportunityResponseDto | null> {
    const opp = await this.findById(id);
    if (opp === null) {
      return null;
    } else {
      assertCanEdit(opp, user);
      const { postedTime, opportunityId, postedByUserId } = opp;
      const updated = await transformAndValidate(
        OpportunityResponseDto,
        nullToUndefined({
          ...values,
          postedTime,
          opportunityId,
          postedByUserId,
        })
      );

      const updatedForDb = undefinedToNull(opp, updated);
      await this.opportunities.update({ opportunityId }, updatedForDb);

      return updated;
    }
  }

  async delete(
    opportunityId: string,
    user: UserInfo
  ): Promise<OpportunityResponseDto | null> {
    const opp = await this.findById(opportunityId);
    if (opp === null) {
      return null;
    } else {
      assertCanEdit(opp, user);
      await this.opportunities.delete({ opportunityId });
      return transformAndValidate(OpportunityResponseDto, nullToUndefined(opp));
    }
  }

  async deleteAll(): Promise<void> {
    await this.opportunities.clear();
    console.info("Deleted all opportunities");
  }

  async createFake(user: UserInfo): Promise<OpportunityResponseDto> {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }

    const startTime = Instant.now().plus(Duration.ofDays(random.int(-10, 10)));
    const endTime = startTime.plus(Duration.ofHours(random.int(0, 24)));
    const fakeOpp = {
      title: faker.lorem.sentence(),
      contactName: faker.name.fullName(),
      requiredPeopleCount: random.int(0, 10),
      startTime: startTime.toEpochMilli(),
      endTime: endTime.toEpochMilli(),
      occursDate: LocalDate.now().plusDays(random.int(-10, 10)).toString(),
      occursTime: faker.lorem.sentences(random.int(0, 1)),
      description: faker.lorem.paragraphs(random.int(1, 3)),
      locationName: faker.address.streetAddress(),
      indoorsOrOutdoors: ["indoors", "outdoors"][random.int(0, 1)]!,
      contactEmail: faker.internet.email(),
      contactPhone: faker.phone.number(),
      criminalRecordCheckRequired: random.bool(),
      idealVolunteer: faker.lorem.sentences(random.int(0, 4)),
      additionalInformation: faker.lorem.paragraphs(random.int(0, 2)),
    };
    return this.create(fakeOpp, user);
  }
}
