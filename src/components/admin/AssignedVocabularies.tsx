import React, { useMemo, useState } from "react";
import AssignedVocabulariesList from "../vocabulary/AssignedVocabulariesList";
import {
  Box,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import SearchIcon from "@mui/icons-material/Search";
import { useGetAllVocabulariesQuery } from "../../api/vocabularyApi";
import {
  filterByGestorPresence,
  filterVocabulariesByLabel,
} from "../../utils/FilterUtils";

const AssignedVocabularies: React.FC = () => {
  const { data } = useGetAllVocabulariesQuery();
  const intl = useIntl();
  const [filterText, setFilterText] = useState("");
  const [withoutGestor, setWithoutGestor] = useState(false);
  const filteredVocabularies = useMemo(() => {
    let dataFiltered = filterVocabulariesByLabel(data ?? [], filterText);
    if (withoutGestor) {
      dataFiltered = filterByGestorPresence(dataFiltered);
    }
    return dataFiltered;
  }, [data, filterText, withoutGestor]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithoutGestor(event.target.checked);
  };

  return (
    <Box px={3} mt={6}>
      <Paper>
        <Box px={3} py={2}>
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              flex: 1,
            }}
          >
            <Typography variant={"h5"}>
              {intl.formatMessage({ id: "assignedVocabulariesHeader" })}
            </Typography>
            <Box display={"flex"}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={withoutGestor} onChange={handleSwitch} />
                  }
                  label={intl.formatMessage({ id: "without-gestors" })}
                />
              </FormGroup>
              <TextField
                size={"small"}
                value={filterText}
                onChange={handleChange}
                label={intl.formatMessage({ id: "search-vocabulary-by-label" })}
                InputProps={{
                  endAdornment: endAdornment,
                }}
              />
            </Box>
          </Box>
          <hr />
        </Box>
        <Box sx={{ paddingBottom: 3 }} px={2}>
          <AssignedVocabulariesList vocabularies={filteredVocabularies ?? []} />
        </Box>
      </Paper>
    </Box>
  );
};

const endAdornment = (
  <InputAdornment position={"end"}>
    <SearchIcon />
  </InputAdornment>
);

export default AssignedVocabularies;
