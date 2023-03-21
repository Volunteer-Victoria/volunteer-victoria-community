import { OpportunityCreateDto } from "../../api";
import { FormData } from "./default-values";

/**
 * Given the output from an opportunity form, creates an OpportunityCreateDto
 * to communicate with the backend
 */
export const formDataToOpportunity = (
  formData: FormData
): OpportunityCreateDto => {
  const occursDate = formData.date.toFormat("yyyy-MM-dd");

  return {
    title: formData.title,
    contactName: formData.contactName,
    requiredPeopleCount: parseInt(formData.requiredPeopleCount),
    description: formData.description,
    locationName: formData.locationName,
    indoorsOutdoorsOnline: formData.indoorsOutdoorsOnline,
    contactPhone: formData.contactPhone,
    criminalRecordCheckRequired: formData.criminalRecordCheckRequired === "yes",
    idealVolunteer: formData.idealVolunteer,
    additionalInformation: formData.additionalInformation,
    occursDate,
    occursTime: formData.time,
  };
};
