import React from "react";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => React.Dispatch<React.SetStateAction<string>>;
  label: string;
}

const SearchBar: React.FC<SearchBarProps & TextFieldProps> = ({
  value,
  onChange,
  label,
  ...props
}) => {
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      size={"small"}
      {...props}
      value={value}
      onChange={handleFilter}
      label={label}
      InputProps={{
        endAdornment: endAdornment,
      }}
    />
  );
};

const endAdornment = (
  <InputAdornment position={"end"}>
    <SearchIcon />
  </InputAdornment>
);

export default SearchBar;
