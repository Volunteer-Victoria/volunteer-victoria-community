import { LocalDateTime, nativeJs } from "@js-joda/core";
import { OpportunityResponseDto } from "../../api";
import { FormData } from "./default-values";

/**
 * Given the an opportunity, creates an object ready to be sent into the
 * opportunity form
 */
export const opportunityToFormData = (
  opportunity: OpportunityResponseDto
): FormData => {
  const startDate = LocalDateTime.from(
    nativeJs(new Date(opportunity.startTime))
  );
  const endDate = LocalDateTime.from(nativeJs(new Date(opportunity.endTime)));

  return {
    title: opportunity.title,
    description: opportunity.description,
    locationName: opportunity.locationName,
    requiredPeopleCount: opportunity.requiredPeopleCount.toString(),
    startDateTime: startDate.toString(),
    endDateTime: endDate.toString(),
    indoorsOrOutdoors: opportunity.indoorsOrOutdoors,
    criminalRecordCheckRequired: opportunity.criminalRecordCheckRequired
      ? "yes"
      : "no",
    idealVolunteer: opportunity.idealVolunteer ?? "",
    additionalInformation: opportunity.additionalInformation ?? "",
    contactName: opportunity.contactName,
    contactEmail: opportunity.contactEmail ?? "",
    contactPhone: opportunity.contactPhone ?? "",
    guidelines: false,
    liability: false,
  };
};
