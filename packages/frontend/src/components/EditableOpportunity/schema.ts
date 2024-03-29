import * as yup from "yup";
import { FormKeys } from "./default-values";

type SchemaFields = Record<FormKeys, yup.AnySchema>;

export const schema = yup.object().shape<SchemaFields>({
  // ABOUT
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),

  // DETAILS
  locationName: yup.string().required("Required"),
  requiredPeopleCount: yup
    .number()
    .typeError("Must be a number")
    .positive("You must need at least one person!")
    .required("Required"),
  date: yup.string().required("Required"),
  time: yup.string().required("Required"),
  indoorsOutdoorsOnline: yup
    .array()
    .required("Required")
    .min(1, "Select at least one option"),
  criminalRecordCheckRequired: yup
    .string()
    .oneOf(["yes", "no"])
    .required("Required"),
  idealVolunteer: yup.string(),
  additionalInformation: yup.string(),

  // Contact Information
  contactName: yup.string().required("Required"),
  contactPhone: yup.string().required("Required"),
  guidelines: yup.boolean().isTrue("Must agree"),
  liability: yup.boolean().isTrue("Must agree"),
});
