/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/v1/opportunity": {
    get: operations["OpportunityController_findAll"];
    post: operations["OpportunityController_create"];
  };
  "/api/v1/opportunity/{id}": {
    get: operations["OpportunityController_findOne"];
    put: operations["OpportunityController_update"];
    delete: operations["OpportunityController_delete"];
  };
}

export interface components {
  schemas: {
    OpportunitySummaryResponseDto: {
      title: string;
      contactName: string;
      requiredPeopleCount: number;
      /** @example 1666666666 */
      startTime: number;
      /** @example 1666666666 */
      endTime: number;
      /** @example 1666666666 */
      postedTime: number;
      opportunityId: string;
    };
    OpportunityCreateDto: {
      title: string;
      contactName: string;
      requiredPeopleCount: number;
      /** @example 1666666666 */
      startTime: number;
      /** @example 1666666666 */
      endTime: number;
      /** @example 1666666666 */
      postedTime: number;
      description: string;
      locationName: string;
      /** @enum {string} */
      indoorsOrOutdoors: "indoors" | "outdoors";
      contactEmail: string;
      contactPhone: string;
      criminalRecordCheckRequired: boolean;
      idealVolunteer: string;
      additionalInformation: string | null;
    };
    OpportunityResponseDto: {
      title: string;
      contactName: string;
      requiredPeopleCount: number;
      /** @example 1666666666 */
      startTime: number;
      /** @example 1666666666 */
      endTime: number;
      /** @example 1666666666 */
      postedTime: number;
      description: string;
      locationName: string;
      /** @enum {string} */
      indoorsOrOutdoors: "indoors" | "outdoors";
      contactEmail: string;
      contactPhone: string;
      criminalRecordCheckRequired: boolean;
      idealVolunteer: string;
      additionalInformation: string | null;
      opportunityId: string;
      postedByUserId: string;
    };
    OpportunityUpdateDto: {
      title: string;
      contactName: string;
      requiredPeopleCount: number;
      /** @example 1666666666 */
      startTime: number;
      /** @example 1666666666 */
      endTime: number;
      /** @example 1666666666 */
      postedTime: number;
      description: string;
      locationName: string;
      /** @enum {string} */
      indoorsOrOutdoors: "indoors" | "outdoors";
      contactEmail: string;
      contactPhone: string;
      criminalRecordCheckRequired: boolean;
      idealVolunteer: string;
      additionalInformation: string | null;
    };
  };
}

export interface operations {
  OpportunityController_findAll: {
    parameters: {};
    responses: {
      default: {
        content: {
          "application/json": components["schemas"]["OpportunitySummaryResponseDto"][];
        };
      };
    };
  };
  OpportunityController_create: {
    parameters: {};
    responses: {
      default: {
        content: {
          "application/json": components["schemas"]["OpportunityResponseDto"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OpportunityCreateDto"];
      };
    };
  };
  OpportunityController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      default: {
        content: {
          "application/json": components["schemas"]["OpportunityResponseDto"];
        };
      };
    };
  };
  OpportunityController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      default: {
        content: {
          "application/json": components["schemas"]["OpportunityResponseDto"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OpportunityUpdateDto"];
      };
    };
  };
  OpportunityController_delete: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      default: {
        content: {
          "application/json": components["schemas"]["OpportunityResponseDto"];
        };
      };
    };
  };
}

export interface external {}
