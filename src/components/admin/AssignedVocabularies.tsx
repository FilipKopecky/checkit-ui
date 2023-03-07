import React from "react";
import AllVocabularies from "../vocabulary/AllVocabularies";
import { Box, Paper, Typography } from "@mui/material";
import { useIntl } from "react-intl";

const AssignedVocabularies: React.FC = () => {
  const intl = useIntl();
  return (
    <Box px={3} mt={6}>
      <Paper>
        <Box px={3} py={2}>
          <Typography variant={"h5"} gutterBottom={true}>
            {intl.formatMessage({ id: "assignedVocabulariesHeader" })}
          </Typography>
          <hr />
        </Box>
        <Box sx={{ paddingBottom: 3 }} px={2}>
          <AllVocabularies />
        </Box>
      </Paper>
    </Box>
  );
};

export default AssignedVocabularies;
