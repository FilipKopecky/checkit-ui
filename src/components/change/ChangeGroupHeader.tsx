import React from "react";
import ObjectLabel from "./ObjectLabel";
import { Box } from "@mui/material";

interface ChangeGroupHeaderProps {
  type: "VOCABULARY" | "TERM";
  uri: string;
}

const ChangeGroupHeader: React.FC<ChangeGroupHeaderProps> = ({ type, uri }) => {
  return (
    <Box
      display={"flex"}
      bgcolor={"#415a99"}
      color={"white"}
      px={4}
      py={2}
      alignItems={"center"}
    >
      <ObjectLabel objectUri={uri} variant={"h6"} />
    </Box>
  );
};

export default ChangeGroupHeader;
