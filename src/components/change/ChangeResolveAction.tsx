import React from "react";
import { Box } from "@mui/material";
import AcceptButton from "../buttons/AcceptButton";
import DeclineButton from "../buttons/DeclineButton";
import { Change, ChangeState } from "../../model/Change";

interface ChangeResolveActionProps {
  handleResolution: (state: ChangeState) => void;
  change: Change;
}
const ChangeResolveAction: React.FC<ChangeResolveActionProps> = ({
  handleResolution,
  change,
}) => {
  //TODO: different handle resolution for non-id changes
  return (
    <Box>
      <AcceptButton onClick={() => handleResolution("APPROVED")} />
      <DeclineButton onClick={() => handleResolution("REJECTED")} />
    </Box>
  );
};

export default ChangeResolveAction;
