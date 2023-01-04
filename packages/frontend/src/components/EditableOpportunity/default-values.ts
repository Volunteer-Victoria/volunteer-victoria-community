import { DateTime } from "luxon";

export const defaultValues = {
  title: "",
  description: "",
  locationName: "",
  requiredPeopleCount: "",
  date: DateTime.now(),
  time: "",
  indoorsOrOutdoors: "",
  criminalRecordCheckRequired: "",
  idealVolunteer: "",
  additionalInformation: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  guidelines: false,
  liability: false,
};

/**
 * An object describing the values which go into / come out of an opportunity
 * form
 */
export type FormData = typeof defaultValues;
export type FormKeys = keyof FormData;
