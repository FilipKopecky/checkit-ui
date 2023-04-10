import React from "react";
import { Alert, Box } from "@mui/material";
import ChangeResolveAction from "./ChangeResolveAction";
import ChangeDeclineMessage from "./ChangeDeclineMessage";
import { Change, ChangeState } from "../../model/Change";
import { useIntl } from "react-intl";

interface ChangeActionsProps {
  change: Change;
  handleResolution: (state: ChangeState) => void;
}

const ChangeActions: React.FC<ChangeActionsProps> = ({
  change,
  handleResolution,
}) => {
  const intl = useIntl();
  return (
    <Box mt={4}>
      {change.state === "NOT_REVIEWED" && change.gestored && (
        <ChangeResolveAction handleResolution={handleResolution} />
      )}
      {change.state === "APPROVED" && (
        <Alert severity="success" sx={{ fontSize: "16px" }}>
          {intl.formatMessage({ id: "accepted" })}
        </Alert>
      )}
      {change.state === "REJECTED" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Alert severity="error" sx={{ fontSize: "16px" }}>
            {intl.formatMessage({ id: "declined" })}
          </Alert>
          <ChangeDeclineMessage
            state={change.state}
            declineComment={change.declineMessage}
            submitDeclineMessage={(content) => {
              console.log(`Submitted reject message ${content}`);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ChangeActions;
