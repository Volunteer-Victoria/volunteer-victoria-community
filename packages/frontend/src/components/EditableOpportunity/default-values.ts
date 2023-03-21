import { DateTime } from "luxon";
import { OpportunityCreateDtoIndoorsOutdoorsOnlineEnum } from "../../api";

export const defaultValues = {
  title: "",
  description: "",
  locationName: "",
  requiredPeopleCount: "",
  date: DateTime.now(),
  time: "",
  indoorsOutdoorsOnline: [] as OpportunityCreateDtoIndoorsOutdoorsOnlineEnum[],
  criminalRecordCheckRequired: "",
  idealVolunteer: "",
  additionalInformation: "",
  contactName: "",
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
