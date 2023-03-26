import React from "react";
import ObjectLabel from "./ObjectLabel";
import { Box } from "@mui/material";

interface ChangeGroupHeaderProps {
  type: "VOCABULARY" | "TERM";
  uri: string;
}

const ChangeGroupHeader: React.FC<ChangeGroupHeaderProps> = ({ type, uri }) => {
  return (
    <Box px={2}>
      <Box
        p={2}
        display={"flex"}
        bgcolor={"#415a99"}
        color={"white"}
        alignItems={"center"}
        borderRadius={"7px 7px 0px 0px"}
      >
        <ObjectLabel objectUri={uri} variant={"h6"} />
      </Box>
    </Box>
  );
};

export default ChangeGroupHeader;
