import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

interface IslandeHeaderProps {
  header: string;
  children?: ReactNode;
}

const IslandHeader: React.FC<IslandeHeaderProps> = ({ header, children }) => {
  return (
    <Box px={3} pt={2} pb={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Typography variant={"h5"} gutterBottom={true}>
          {header}
        </Typography>
        {children}
      </Box>
      <Box mb={2}>
        <Divider />
      </Box>
    </Box>
  );
};

export default IslandHeader;
