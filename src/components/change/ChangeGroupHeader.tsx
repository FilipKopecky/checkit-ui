import React from "react";
import ObjectLabel from "./ObjectLabel";
import { Box, Paper } from "@mui/material";

interface ChangeGroupHeaderProps {
  type: "VOCABULARY" | "TERM";
  uri: string;
}

const ChangeGroupHeader: React.FC<ChangeGroupHeaderProps> = ({ type, uri }) => {
  return (
    <Box px={2}>
      <Paper>
        <Box
          display={"flex"}
          bgcolor={"white"}
          p={2}
          alignItems={"center"}
          gap={2}
        >
          <ObjectLabel objectUri={uri} variant={"h5"} />
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangeGroupHeader;
