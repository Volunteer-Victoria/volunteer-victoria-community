import { DateTime } from "luxon";
import { OpportunityResponseDto } from "../../api";
import { FormData } from "./default-values";

/**
 * Given the an opportunity, creates an object ready to be sent into the
 * opportunity form
 */
export const opportunityToFormData = (
  opportunity: OpportunityResponseDto
): FormData => {
  const date = DateTime.fromFormat(opportunity.occursDate, "yyyy-MM-dd", {
    zone: "local",
  });

  return {
    title: opportunity.title,
    description: opportunity.description,
    locationName: opportunity.locationName,
    requiredPeopleCount: opportunity.requiredPeopleCount.toString(),
    date,
    time: opportunity.occursTime ?? "",
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
