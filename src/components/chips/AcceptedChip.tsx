import React from "react";
import { Box, Chip } from "@mui/material";
import { useIntl } from "react-intl";

const AcceptedChip: React.FC = () => {
  const intl = useIntl();
  return (
    <Box sx={{ textTransform: "uppercase" }}>
      <Chip
        label={intl.formatMessage({ id: "accepted" })}
        color="success"
        variant="filled"
      />
    </Box>
  );
};

export default AcceptedChip;
