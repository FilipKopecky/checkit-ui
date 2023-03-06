import React from "react";
import AllVocabularies from "../vocabulary/AllVocabularies";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";

const AssignedVocabularies: React.FC = () => {
  const intl = useIntl();
  return (
    <Box px={3}>
      <Typography variant={"h4"}>
        {intl.formatMessage({ id: "assignedVocabulariesHeader" })}
      </Typography>
      <Box py={2}>
        <AllVocabularies />
      </Box>
    </Box>
  );
};

export default AssignedVocabularies;
