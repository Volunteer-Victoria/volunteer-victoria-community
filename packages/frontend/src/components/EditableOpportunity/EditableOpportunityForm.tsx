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
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={5}>
        <Fieldset title="About the Opportunity">
          <Stack spacing={4}>
            <TextField
              label="Opportunity name"
              {...mapFormik(formik, "title")}
            />
            <TextField
              multiline
              rows={9}
              label="Description"
              {...mapFormik(formik, "description")}
            />
          </Stack>
        </Fieldset>
        <Fieldset title="Details">
          <Stack spacing={4}>
            <Stack spacing={4} direction="row">
              <TextField
                fullWidth
                label="Location"
                {...mapFormik(formik, "locationName")}
              />
              <TextField
                fullWidth
                label="Number of people required"
                {...mapFormik(formik, "requiredPeopleCount")}
              />
            </Stack>
            <Stack spacing={4} direction="row">
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                label="Start time"
                type="datetime-local"
                inputProps={{ step: 60 * 60 }}
                {...mapFormik(formik, "startDateTime")}
              />
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                label="End time"
                type="datetime-local"
                inputProps={{ step: 60 * 60 }}
                {...mapFormik(formik, "endDateTime")}
              />
            </Stack>
            <Stack spacing={4} direction="row">
              <FormControl
                fullWidth
                error={
                  formik.touched.indoorsOrOutdoors &&
                  Boolean(formik.errors.indoorsOrOutdoors)
                }
              >
                <FormLabel id="demo-radio-buttons-group-label">
                  Is your opportunity indoors or outdoors?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
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
                <FormLabel id="demo-radio-buttons-group-label">
                  Criminal Record Check Required?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  {...mapFormik(formik, "criminalRecordCheckRequired", [
                    "helperText",
                    "error",
                  ])}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
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
          <Stack spacing={4}>
            <TextField label="Name" {...mapFormik(formik, "contactName")} />
            <Stack spacing={4} direction="row">
              <TextField
                fullWidth
                label="Email"
                {...mapFormik(formik, "contactEmail")}
              />
              <TextField
                fullWidth
                label="Phone Number"
                {...mapFormik(formik, "contactPhone")}
              />
            </Stack>
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
                You are responsible for vetting volunteers to ensure that they
                are a good fit for the position
              </li>
              <li>
                All volunteers between 15-18 years old, must have parental
                permission before they can volunteer
              </li>
              <li>
                All volunteers under age 15, must be accompanied by a parent or
                guardian
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
                {formik.touched.liability &&
                  (formik.errors.liability as string)}
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
    </form>
  );
};
