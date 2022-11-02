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
        opportunityId: { partitionKey: true },
        postedTime: { type: "number", sortKey: true },
      },
      table: ddb.table,
    } as const);
  }
}
