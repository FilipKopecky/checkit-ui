import React from "react";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
const SearchBar: React.FC<SearchBarProps & TextFieldProps> = ({
  value,
  onChange,
  label,
  ...props
}) => {
  return (
    <TextField
      {...props}
      size={"small"}
      value={value}
      onChange={onChange}
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
