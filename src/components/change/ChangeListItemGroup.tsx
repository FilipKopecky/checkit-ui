import React from "react";
import ObjectLabel from "./ObjectLabel";
import { Box, Paper } from "@mui/material";

interface ChangeGroupHeaderProps {
  uri: string;
}

const ChangeListItemGroup: React.FC<ChangeGroupHeaderProps> = ({ uri }) => {
  return (
    <Box pr={1}>
      <Paper elevation={2}>
        <Box p={2}>
          <ObjectLabel objectUri={uri} variant={"h5"} />
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangeListItemGroup;
