import React from "react";
import { Box } from "@mui/material";
import AcceptButton from "../buttons/AcceptButton";
import DeclineButton from "../buttons/DeclineButton";
import { Change, ChangeState } from "../../model/Change";

interface ChangeResolveActionProps {
  change: Change;
  handleResolution: (state: ChangeState) => void;
  handleClear: (state?: ChangeState) => void;
}

const ChangeResolveAction: React.FC<ChangeResolveActionProps> = ({
  handleResolution,
  handleClear,
  change,
}) => {
  //When change is in finished publication or users doesn't gestor the vocabulary
  if (change.readOnly || !change.gestored) {
    return <></>;
  }

  //When change is rollbacked, different action needs to be shown
  if (change.type === "ROLLBACKED" && change.state !== "SEEN") {
    return (
      <AcceptButton
        onClick={() => handleClear("SEEN")}
        labelKey={"acknowledge-rollback"}
      />
    );
  }

  //When the change has not yet been resolved
  if (change.state === "NOT_REVIEWED") {
    return (
      <Box>
        <AcceptButton onClick={() => handleResolution("APPROVED")} />
        <DeclineButton onClick={() => handleResolution("REJECTED")} />
      </Box>
    );
  }

  return <></>;
};

export default ChangeResolveAction;
