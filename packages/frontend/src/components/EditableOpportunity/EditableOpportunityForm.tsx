import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { DateTime } from "luxon";

import { mapFormik } from "../../common";
import { LocationSelector } from "../LocationSelector";
import { defaultValues, FormData } from "./default-values";
import { Fieldset } from "./Fieldset";
import { schema } from "./schema";
import { useMemo } from "react";
import { IndoorsOutdoorsOnline } from "./Fields/IndoorsOutdoorsOnline";
import { Link } from "react-router-dom";

interface EditableOpportunityFormProps {
  initialValues: Partial<FormData>;
  onSubmit: (opportunity: FormData) => void;
  submitting: boolean;
}

export const EditableOpportunityForm = ({
  initialValues,
  onSubmit,
  submitting,
}: EditableOpportunityFormProps) => {
  const formik = useFormik<typeof defaultValues>({
    initialValues: { ...defaultValues, ...initialValues },
    validationSchema: schema,
    onSubmit,
  });

  const buttonLabel = useMemo(() => {
    if (initialValues.title) {
      if (submitting) {
        return "Saving...";
      }
      return "Save";
    }

    if (submitting) {
      return "Posting...";
    }

    return "Post";
  }, [initialValues.title, submitting]);

  return (
    <Stack component="form" onSubmit={formik.handleSubmit} spacing={5}>
      <Fieldset title="About the Opportunity">
        <Stack spacing={{ xs: 2, lg: 4 }}>
          <TextField label="Opportunity name" {...mapFormik(formik, "title")} />
          <TextField
            multiline
            rows={9}
            label="Description"
            {...mapFormik(formik, "description")}
          />
        </Stack>
      </Fieldset>
      <Fieldset title="Details">
        <Stack spacing={{ xs: 2, lg: 4 }}>
          <LocationSelector {...mapFormik(formik, "locationName")} />
          <TextField
            fullWidth
            label="Number of people required"
            {...mapFormik(formik, "requiredPeopleCount")}
          />
          <DatePicker
            label="Date"
            disableMaskedInput
            {...mapFormik(formik, "date", ["onChange"])}
            onChange={(date) => formik.setFieldValue("date", date)}
            minDate={DateTime.now()}
            maxDate={DateTime.now().plus({ weeks: 4 })}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Time"
            placeholder="10am, Afternoon, etc."
            {...mapFormik(formik, "time")}
          />
          <Stack direction={{ xs: "column", lg: "row" }}>
            <IndoorsOutdoorsOnline
              value={formik.values.indoorsOutdoorsOnline}
              error={formik.errors.indoorsOutdoorsOnline as string}
              touched={Boolean(formik.touched.indoorsOutdoorsOnline)}
              onChange={(value) =>
                formik.setFieldValue("indoorsOutdoorsOnline", value)
              }
            />
            <FormControl
              fullWidth
              error={
                formik.touched.criminalRecordCheckRequired &&
                Boolean(formik.errors.criminalRecordCheckRequired)
              }
            >
              <FormLabel id="criminal-check-group-label">
                Criminal Record Check Required?
              </FormLabel>
              <RadioGroup
                aria-labelledby="criminal-check-group-label"
                row
                {...mapFormik(formik, "criminalRecordCheckRequired", [
                  "helperText",
                  "error",
                ])}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              <FormHelperText>
                {formik.touched.criminalRecordCheckRequired &&
                  (formik.errors.criminalRecordCheckRequired as string)}
              </FormHelperText>
            </FormControl>
          </Stack>
          <TextField
            label="Ideal Volunteer (optional)"
            {...mapFormik(formik, "idealVolunteer")}
          />
          <TextField
            label="Additional Information (optional)"
            {...mapFormik(formik, "additionalInformation")}
          />
        </Stack>
      </Fieldset>
      <Fieldset title="Your Contact Information">
        <Stack spacing={{ xs: 2, lg: 4 }}>
          <TextField label="Name" {...mapFormik(formik, "contactName")} />
          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            {...mapFormik(formik, "contactPhone")}
          />
        </Stack>
      </Fieldset>
      <Divider />
      <Stack spacing={2}>
        <Alert severity="info">
          Liability Notice
          <Box component="ul" sx={{ pl: 2 }}>
            <li>
              You are responsible for vetting volunteers to ensure that they are
              a good fit for the position.
            </li>
            <li>
              All volunteers between 15-18 years old must have parental
              permission before they can volunteer.
            </li>
            <li>
              All volunteers under age 15 must be accompanied by a parent or
              guardian.
            </li>
          </Box>
        </Alert>
        <Stack spacing={0}>
          <FormControl
            error={!!(formik.touched.liability && formik.errors.liability)}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="liability"
                  checked={formik.values.liability}
                  onChange={formik.handleChange}
                />
              }
              label="I have read, understand and agree to the liability notice"
            />
            <FormHelperText>
              {formik.touched.liability && (formik.errors.liability as string)}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={!!(formik.touched.guidelines && formik.errors.guidelines)}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="guidelines"
                  checked={formik.values.guidelines}
                  onChange={formik.handleChange}
                />
              }
              label="I have read, understand and agree to the terms and conditions"
            />
            <FormHelperText>
              <Link to="/terms-and-conditions" target="_blank">
                Volunteer Victoria's Terms and Conditions
              </Link>
            </FormHelperText>
            <FormHelperText>
              {formik.touched.guidelines &&
                (formik.errors.guidelines as string)}
            </FormHelperText>
          </FormControl>
        </Stack>
      </Stack>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" type="submit" disabled={submitting}>
          {buttonLabel}
          {submitting && (
            <CircularProgress sx={{ ml: 2 }} size={18} color="inherit" />
          )}
        </Button>
      </Box>
    </Stack>
  );
};
