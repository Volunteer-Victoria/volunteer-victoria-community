import * as yup from "yup";

export const schema = yup.object().shape<{
  name: yup.StringSchema;
  message: yup.StringSchema;
  guidelines: yup.BooleanSchema;
}>({
  name: yup.string().required("Required"),
  message: yup.string().required("Required"),
  guidelines: yup.boolean().isTrue("Must agree"),
});
