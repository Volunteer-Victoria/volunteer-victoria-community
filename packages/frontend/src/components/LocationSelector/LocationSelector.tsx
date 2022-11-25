import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  FormHelperText,
} from "@mui/material";
import { locations } from "./locations";

interface LocationSelectorProps extends SelectProps {
  helperText?: string;
}

export const LocationSelector = ({
  helperText,
  ...props
}: LocationSelectorProps) => {
  const value = locations.includes((props.value as string) ?? "")
    ? props.value
    : "";
  return (
    <FormControl fullWidth>
      <InputLabel id={`${props.id}-label`}>Location</InputLabel>
      <Select
        labelId={`${props.id}-label`}
        label="Location"
        {...props}
        value={value}
      >
        {locations.map((location) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
