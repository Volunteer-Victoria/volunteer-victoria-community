/* tslint:disable */
/* eslint-disable */
/**
 * Volunteer Victoria - Community
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface OpportunityResponseDto
 */
export interface OpportunityResponseDto {
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  contactName: string;
  /**
   *
   * @type {number}
   * @memberof OpportunityResponseDto
   */
  requiredPeopleCount: number;
  /**
   *
   * @type {number}
   * @memberof OpportunityResponseDto
   */
  startTime: number;
  /**
   *
   * @type {number}
   * @memberof OpportunityResponseDto
   */
  endTime: number;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  locationName: string;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  indoorsOrOutdoors: OpportunityResponseDtoIndoorsOrOutdoorsEnum;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  contactEmail?: string;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  contactPhone?: string;
  /**
   *
   * @type {boolean}
   * @memberof OpportunityResponseDto
   */
  criminalRecordCheckRequired: boolean;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  idealVolunteer?: string;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  additionalInformation?: string;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  opportunityId: string;
  /**
   *
   * @type {number}
   * @memberof OpportunityResponseDto
   */
  postedTime: number;
  /**
   *
   * @type {string}
   * @memberof OpportunityResponseDto
   */
  postedByUserId: string;
}

/**
 * @export
 */
export const OpportunityResponseDtoIndoorsOrOutdoorsEnum = {
  Indoors: "indoors",
  Outdoors: "outdoors",
} as const;
export type OpportunityResponseDtoIndoorsOrOutdoorsEnum =
  typeof OpportunityResponseDtoIndoorsOrOutdoorsEnum[keyof typeof OpportunityResponseDtoIndoorsOrOutdoorsEnum];

/**
 * Check if a given object implements the OpportunityResponseDto interface.
 */
export function instanceOfOpportunityResponseDto(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "title" in value;
  isInstance = isInstance && "contactName" in value;
  isInstance = isInstance && "requiredPeopleCount" in value;
  isInstance = isInstance && "startTime" in value;
  isInstance = isInstance && "endTime" in value;
  isInstance = isInstance && "description" in value;
  isInstance = isInstance && "locationName" in value;
  isInstance = isInstance && "indoorsOrOutdoors" in value;
  isInstance = isInstance && "criminalRecordCheckRequired" in value;
  isInstance = isInstance && "opportunityId" in value;
  isInstance = isInstance && "postedTime" in value;
  isInstance = isInstance && "postedByUserId" in value;

  return isInstance;
}

export function OpportunityResponseDtoFromJSON(
  json: any
): OpportunityResponseDto {
  return OpportunityResponseDtoFromJSONTyped(json, false);
}

export function OpportunityResponseDtoFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OpportunityResponseDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    title: json["title"],
    contactName: json["contactName"],
    requiredPeopleCount: json["requiredPeopleCount"],
    startTime: json["startTime"],
    endTime: json["endTime"],
    description: json["description"],
    locationName: json["locationName"],
    indoorsOrOutdoors: json["indoorsOrOutdoors"],
    contactEmail: !exists(json, "contactEmail")
      ? undefined
      : json["contactEmail"],
    contactPhone: !exists(json, "contactPhone")
      ? undefined
      : json["contactPhone"],
    criminalRecordCheckRequired: json["criminalRecordCheckRequired"],
    idealVolunteer: !exists(json, "idealVolunteer")
      ? undefined
      : json["idealVolunteer"],
    additionalInformation: !exists(json, "additionalInformation")
      ? undefined
      : json["additionalInformation"],
    opportunityId: json["opportunityId"],
    postedTime: json["postedTime"],
    postedByUserId: json["postedByUserId"],
  };
}

export function OpportunityResponseDtoToJSON(
  value?: OpportunityResponseDto | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    title: value.title,
    contactName: value.contactName,
    requiredPeopleCount: value.requiredPeopleCount,
    startTime: value.startTime,
    endTime: value.endTime,
    description: value.description,
    locationName: value.locationName,
    indoorsOrOutdoors: value.indoorsOrOutdoors,
    contactEmail: value.contactEmail,
    contactPhone: value.contactPhone,
    criminalRecordCheckRequired: value.criminalRecordCheckRequired,
    idealVolunteer: value.idealVolunteer,
    additionalInformation: value.additionalInformation,
    opportunityId: value.opportunityId,
    postedTime: value.postedTime,
    postedByUserId: value.postedByUserId,
  };
}
