import { Entity } from "dynamodb-toolbox";
import { Injectable } from "@nestjs/common";
import { DynamoDBService } from "../ddb/ddb.service";

export const DUMMY_VALUES = { sk: "dummy" };

@Injectable()
export class OpportunityEntity {
  readonly value;

  constructor(ddb: DynamoDBService) {
    this.value = new Entity({
      name: "Opportunity",
      attributes: {
        opportunityId: { type: "string", partitionKey: true },
        sk: { type: "string", sortKey: true },

        title: "string",
        contactName: "string",
        requiredPeopleCount: "number",
        occursDate: "string",
        occursTime: "string",
        postedTime: "number",
        description: "string",
        locationName: "string",
        indoorsOrOutdoors: "string",
        contactEmail: "string",
        contactPhone: "string",
        criminalRecordCheckRequired: "boolean",
        idealVolunteer: "string",
        additionalInformation: "string",
        postedByUserId: "string",
      },
      table: ddb.table,
    } as const);
  }
}
