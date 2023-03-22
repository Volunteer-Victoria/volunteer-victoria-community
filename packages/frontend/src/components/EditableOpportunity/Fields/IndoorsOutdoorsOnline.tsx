import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { OpportunityResponseDtoIndoorsOutdoorsOnlineEnum } from "../../../api";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export interface IndoorsOutdoorsOnlineProps {
  value: OpportunityResponseDtoIndoorsOutdoorsOnlineEnum[];
  error?: string;
  touched?: boolean;
  onChange: (value: OpportunityResponseDtoIndoorsOutdoorsOnlineEnum[]) => void;
}

interface Option {
  label: string;
  value: OpportunityResponseDtoIndoorsOutdoorsOnlineEnum;
}
const options: Option[] = [
  { label: "Indoors", value: "indoors" },
  { label: "Outdoors", value: "outdoors" },
  { label: "Online", value: "online" },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const IndoorsOutdoorsOnline = ({
  value,
  error,
  touched,
  onChange,
}: IndoorsOutdoorsOnlineProps) => {
  const mappedValue: Option[] = (value || []).map((v) => {
    return options.find((o) => o.value === v) as Option;
  });

  return (
    <FormControl fullWidth error={touched && Boolean(error)}>
      <Autocomplete
        value={mappedValue}
        multiple
        id="indoors-outdoors-online"
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        onChange={(event, value) => {
          onChange(value.map((v) => v.value));
        }}
        renderOption={(props, option) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={value.includes(option.value)}
              value={option.value}
            />
            {option.label}
          </li>
        )}
        style={{ width: 500 }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              error={touched && Boolean(error)}
              label="Is Your Opportunity Indoors/Outdoors/Online"
              placeholder="Location"
            />
          );
        }}
      />
      <FormHelperText>{touched && error}</FormHelperText>
    </FormControl>
  );
};
