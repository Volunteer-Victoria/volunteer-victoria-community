import {
  OpportunityCreateDto,
  OpportunityCreateDtoIndoorsOrOutdoorsEnum,
} from "../../api";
import { FormData } from "./default-values";

/**
 * Given the output from an opportunity form, creates an OpportunityCreateDto
 * to communicate with the backend
 */
export const formDataToOpportunity = (
  formData: FormData
): OpportunityCreateDto => {
  const indoorsOrOutdoors =
    formData.indoorsOrOutdoors === "indoors"
      ? OpportunityCreateDtoIndoorsOrOutdoorsEnum.Indoors
      : OpportunityCreateDtoIndoorsOrOutdoorsEnum.Outdoors;

  return {
    title: formData.title,
    contactName: formData.contactName,
    requiredPeopleCount: parseInt(formData.requiredPeopleCount),
    description: formData.description,
    locationName: formData.locationName,
    indoorsOrOutdoors,
    contactEmail: formData.contactEmail,
    contactPhone: formData.contactPhone,
    criminalRecordCheckRequired: formData.criminalRecordCheckRequired === "yes",
    idealVolunteer: formData.idealVolunteer,
    additionalInformation: formData.additionalInformation,
    startTime: 0,
    endTime: 0,
  };
};
