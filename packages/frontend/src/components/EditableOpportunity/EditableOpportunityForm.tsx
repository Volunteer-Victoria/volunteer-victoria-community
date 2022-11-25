import { LocalDate } from "@js-joda/core";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { mapFormik } from "../../common";
import { LocationSelector } from "../LocationSelector";
import { defaultValues, FormData } from "./default-values";
import { Fieldset } from "./Fieldset";
import { schema } from "./schema";

interface EditableOpportunityFormProps {
  initialValues: Partial<FormData>;
  onSubmit: (opportunity: FormData) => void;
}

export const EditableOpportunityForm = ({
  initialValues,
  onSubmit,
}: EditableOpportunityFormProps) => {
  const formik = useFormik<typeof defaultValues>({
    initialValues: { ...defaultValues, ...initialValues },
    validationSchema: schema,
    onSubmit,
  });

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
          <LocationSelector
            {...mapFormik(formik, "locationName", ["helperText"])}
          />
          <TextField
            fullWidth
            label="Number of people required"
            {...mapFormik(formik, "requiredPeopleCount")}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Date"
            type="date"
            inputProps={{
              min: LocalDate.now().toString(),
              max: LocalDate.now().plusWeeks(4).toString(),
            }}
            {...mapFormik(formik, "date")}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Time"
            placeholder="10am, Afternoon, etc."
            {...mapFormik(formik, "time")}
          />
          <FormControl
            fullWidth
            error={
              formik.touched.indoorsOrOutdoors &&
              Boolean(formik.errors.indoorsOrOutdoors)
            }
          >
            <FormLabel id="indoor-outdoors-group-label">
              Is your opportunity indoors or outdoors?
            </FormLabel>
            <RadioGroup
              aria-labelledby="indoor-outdoors-group-label"
              row
              {...mapFormik(formik, "indoorsOrOutdoors", [
                "helperText",
                "error",
              ])}
            >
              <FormControlLabel
                value="indoors"
                control={<Radio />}
                label="Indoors"
              />
              <FormControlLabel
                value="outdoors"
                control={<Radio />}
                label="Outdoors"
              />
            </RadioGroup>
            <FormHelperText>
              {formik.touched.indoorsOrOutdoors &&
                (formik.errors.indoorsOrOutdoors as string)}
            </FormHelperText>
          </FormControl>
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
            label="Email"
            type="email"
            {...mapFormik(formik, "contactEmail")}
          />
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
          General Guidelines
          <Box component="ul" sx={{ pl: 2 }}>
            <li>Guideline 1</li>
            <li>Guideline 2</li>
            <li>Guideline 3</li>
          </Box>
        </Alert>
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
              label="I have read, understand and agree to the general guidelines"
            />
            <FormHelperText>
              {formik.touched.guidelines &&
                (formik.errors.guidelines as string)}
            </FormHelperText>
          </FormControl>
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
        </Stack>
      </Stack>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" type="submit">
          {initialValues.title ? "Save" : "Post"}
        </Button>
      </Box>
    </Stack>
  );
};
