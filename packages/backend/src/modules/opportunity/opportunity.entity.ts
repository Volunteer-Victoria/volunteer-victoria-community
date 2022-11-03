import { Entity } from "dynamodb-toolbox";
import { Injectable } from "@nestjs/common";
import { DynamoDBService } from "../ddb/ddb.service";

@Injectable()
export class OpportunityEntity {
  readonly value;

  constructor(ddb: DynamoDBService) {
    this.value = new Entity({
      name: "Opportunity",
      attributes: {
        opportunityId: { type: "string", partitionKey: true },
        sk: { sortKey: true, hidden: true },

        postedTime: ["sk", 0, "number"],

        title: "string",
        contactName: "string",
        requiredPeopleCount: "number",
        startTime: "number",
        endTime: "number",
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
