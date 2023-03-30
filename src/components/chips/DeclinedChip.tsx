import React from "react";
import { Box, Chip } from "@mui/material";
import { useIntl } from "react-intl";

const DeclinedChip: React.FC = () => {
  const intl = useIntl();
  return (
    <Box sx={{ textTransform: "uppercase" }}>
      <Chip
        label={intl.formatMessage({ id: "declined" })}
        color="error"
        variant="filled"
      />
    </Box>
  );
};

export default DeclinedChip;
