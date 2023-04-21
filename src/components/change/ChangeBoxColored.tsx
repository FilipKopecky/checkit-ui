import React, { ReactNode } from "react";
import { ChangeType } from "../../model/Change";
import { Box, BoxProps } from "@mui/material";
import { getModificationColor } from "../../utils/ChangeUtils";

interface ChangeBoxColoredProps {
  type: ChangeType;
  children: ReactNode;
}

const ChangeBoxColored: React.FC<ChangeBoxColoredProps & BoxProps> = ({
  type,
  children,
  ...props
}) => {
  return (
    <Box
      sx={{
        borderLeft: 6,
        borderColor: getModificationColor(type),
        paddingLeft: 2,
        height: "100%",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ChangeBoxColored;
