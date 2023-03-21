import { FormikValues, useFormik } from "formik";

const AVAILABLE_FIELDS = [
  "name",
  "id",
  "title",
  "value",
  "onChange",
  "error",
  "helperText",
] as const;
type AvailableFields = typeof AVAILABLE_FIELDS[number];

/**
 * Given a formik control and a field name, returns an object which can be
 * destructured onto MUI elements to fill in form values
 */
export const mapFormik = <T extends FormikValues>(
  formik: ReturnType<typeof useFormik<T>>,
  name: Extract<keyof T, string>,
  exclude: AvailableFields[] = []
) => {
  if (!(name in formik.initialValues)) {
    throw new Error(`Ensure ${name} has an initial value set`);
  }
  const fields = {
    name,
    id: name,
    title: name,
    value: formik.values[name],
    onChange: formik.handleChange.bind(formik),
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && (formik.errors[name] as string),
  };

  for (const field of exclude) {
    delete fields[field];
  }

  return fields;
};
