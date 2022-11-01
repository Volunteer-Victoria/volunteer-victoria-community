import { Entity } from "dynamodb-toolbox";
import { Injectable } from "@nestjs/common";
import type { DynamoDBService } from "../ddb/ddb.service";

@Injectable()
export class OpportunityEntityProvider {
  readonly entity;

  constructor(ddb: DynamoDBService) {
    this.entity = new Entity({
      // Specify entity name
      name: "Opportunity",

      // Define attributes
      attributes: {
        opportunityId: { partitionKey: true }, // flag as partitionKey
        postedTime: { type: "number", sortKey: true }, // flag as sortKey and mark hidden
      },

      // Assign it to our table
      table: ddb.table,

      // In Typescript, the "as const" statement is needed for type inference
    } as const);
  }
}
