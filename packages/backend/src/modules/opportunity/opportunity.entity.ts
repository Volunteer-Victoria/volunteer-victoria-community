import { AppTable } from "../../dynamodb";
import { Entity } from "dynamodb-toolbox";

export const OpportunityEntity = new Entity({
  // Specify entity name
  name: "Opportunity",

  // Define attributes
  attributes: {
    opportunityId: { partitionKey: true }, // flag as partitionKey
    postedTime: { type: "number", sortKey: true }, // flag as sortKey and mark hidden
  },

  // Assign it to our table
  table: AppTable,

  // In Typescript, the "as const" statement is needed for type inference
} as const);
