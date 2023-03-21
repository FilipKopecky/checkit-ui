import React from "react";
import { Box, Typography } from "@mui/material";

interface IslandeHeaderProps {
  header: string;
}

const IslandHeader: React.FC<IslandeHeaderProps> = ({ header }) => {
  return (
    <Box px={3} pt={2} pb={1}>
      <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
        <Typography variant={"h5"} gutterBottom={true}>
          {header}
        </Typography>
      </Box>
      <Box mb={2}>
        <hr />
      </Box>
    </Box>
  );
};

export default IslandHeader;
