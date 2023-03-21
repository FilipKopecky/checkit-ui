import React, { Dispatch, SetStateAction } from "react";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
}

const SearchBar: React.FC<SearchBarProps & TextFieldProps> = ({
  value,
  setValue,
  label,
  ...props
}) => {
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
