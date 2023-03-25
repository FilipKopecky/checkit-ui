import React from "react";
import { Change } from "../../model/Change";
import { Box, Typography } from "@mui/material";
import { generateTripleFromChange } from "../../utils/ChangeUtils";

interface ChangeTurtleDetailProps {
  change: Change;
}
const ChangeTurtleDetail: React.FC<ChangeTurtleDetailProps> = ({ change }) => {
  return (
    <Box>
      <Typography variant={"h6"}>Nový triple</Typography>
      <p style={{ whiteSpace: "pre-wrap" }}>
        {generateTripleFromChange(change)}
      </p>
    </Box>
  );
};

export default ChangeTurtleDetail;
