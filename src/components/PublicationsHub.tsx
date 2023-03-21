import React from "react";
import PublicationsList from "./publications/PublicationsList";
import { Box, Paper } from "@mui/material";
import IslandHeader from "./misc/IslandHeader";

const PublicationsHub: React.FC = () => {
  return (
    <Box px={3} mt={2}>
      <Paper>
        <IslandHeader header={"Publikace"} />
        <Box px={3}>
          <PublicationsList />
        </Box>
      </Paper>
    </Box>
  );
};

export default PublicationsHub;
