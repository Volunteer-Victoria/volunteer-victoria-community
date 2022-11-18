import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDebounce } from "../../hooks";

interface FilterProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  delay?: number;
}

export function Filter({ keyword, setKeyword, delay = 500 }: FilterProps) {
  const [value, setValue] = useState(keyword);

  const debouncedKeyword = useDebounce(value, delay);

  useEffect(() => {
    setKeyword(debouncedKeyword);
  }, [debouncedKeyword, setKeyword]);

  return (
    <TextField
      label="Search Keyword"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      variant="outlined"
      sx={{
        flex: 4,
      }}
      InputProps={{
        sx: {
          backgroundColor: "white",
        },
      }}
    />
  );
}
