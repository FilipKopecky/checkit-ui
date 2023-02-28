import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";

const AdminPanel: React.FC = () => {
  const intl = useIntl();
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
      p={3}
    >
      <Typography variant={"h4"}>{intl.formatMessage({id: "admin-panel-header"})}</Typography>
    </Box>
  );
};

export default AdminPanel;
