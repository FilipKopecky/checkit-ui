import React from "react";
import { Box } from "@mui/material";
import AcceptButton from "../buttons/AcceptButton";
import DeclineButton from "../buttons/DeclineButton";
import { ChangeState } from "../../model/Change";

interface ChangeResolveActionProps {
  handleResolution: (state: ChangeState) => void;
}
const ChangeResolveAction: React.FC<ChangeResolveActionProps> = ({
  handleResolution,
}) => {
  return (
    <Box>
      <AcceptButton onClick={() => handleResolution("APPROVED")} />
      <DeclineButton onClick={() => handleResolution("REJECTED")} />
    </Box>
  );
};

export default ChangeResolveAction;
