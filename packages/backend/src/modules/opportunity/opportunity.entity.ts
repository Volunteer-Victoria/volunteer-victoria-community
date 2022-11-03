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
        postedTime: { type: "string", sortKey: true },

        title: { type: "string" },
        contactName: { type: "string" },
        requiredPeopleCount: { type: "number" },
        startTime: { type: "number" },
        endTime: { type: "number" },
        description: { type: "string" },
        locationName: { type: "string" },
        indoorsOrOutdoors: { type: "string" },
        contactEmail: { type: "string" },
        contactPhone: { type: "string" },
        criminalRecordCheckRequired: { type: "boolean" },
        idealVolunteer: { type: "string" },
        additionalInformation: { type: "string" },
        postedByUserId: { type: "string" },
      },
      table: ddb.table,
    } as const);
  }
}
