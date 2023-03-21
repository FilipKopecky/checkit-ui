import React from "react";
import PublicationsList from "./publications/PublicationsList";
import { Box, Paper } from "@mui/material";
import IslandHeader from "./misc/IslandHeader";
import { useIntl } from "react-intl";

const PublicationsHub: React.FC = () => {
  const intl = useIntl();
  return (
    <Box px={3} mt={2}>
      <Paper>
        <IslandHeader
          header={intl.formatMessage({ id: "available-publications" })}
        />
        <Box px={3}>
          <PublicationsList />
        </Box>
      </Paper>
    </Box>
  );
};

export default PublicationsHub;
