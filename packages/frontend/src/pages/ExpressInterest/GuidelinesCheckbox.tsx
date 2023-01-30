import {
  FormControl,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

interface GuidelinesCheckboxProps {
  touched?: boolean;
  errors?: string;
  guidelines: boolean;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

export function GuidelinesCheckbox({
  touched,
  errors,
  guidelines,
  handleChange,
}: GuidelinesCheckboxProps) {
  return (
    <FormControl error={!!(touched && errors)}>
      <FormControlLabel
        control={
          <Checkbox
            name="guidelines"
            checked={guidelines}
            onChange={handleChange}
          />
        }
        label="I have read, understand and agree to the general guidelines and note"
      />
      <FormHelperText>{touched && (errors as string)}</FormHelperText>
    </FormControl>
  );
}
