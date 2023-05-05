import React from "react";
import { Change } from "../../model/Change";
import { Alert, Box, Button } from "@mui/material";
import { useIntl } from "react-intl";
import ChangeDeclineMessage from "./ChangeDeclineMessage";
import { CommentFormData } from "../../model/CommentData";

interface ChangeStateProps {
  change: Change;
  handleClear: () => void;
  handleSubmitDeclineMessage: (data: CommentFormData) => void;
}

const ChangeResolvedState: React.FC<ChangeStateProps> = ({
  change,
  handleClear,
  handleSubmitDeclineMessage,
}) => {
  const intl = useIntl();
  if (change.type === "ROLLBACKED" && change.state !== "SEEN") {
    return <></>;
  }
  if (change.state === "APPROVED") {
    return (
      <Alert
        severity="success"
        sx={{
          fontSize: "16px",
        }}
        action={
          <Button color="inherit" size="small" onClick={() => handleClear()}>
            {intl.formatMessage({ id: "undo" })}
          </Button>
        }
      >
        {intl.formatMessage({ id: "accepted" })}
      </Alert>
    );
  }
  if (change.state === "REJECTED") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Alert
          severity="error"
          sx={{ fontSize: "16px" }}
          action={
            <Button color="inherit" size="small" onClick={() => handleClear()}>
              {intl.formatMessage({ id: "undo" })}
            </Button>
          }
        >
          {intl.formatMessage({ id: "declined" })}
        </Alert>
        <ChangeDeclineMessage
          state={change.state}
          declineComment={change.rejectionComment}
          submitDeclineMessage={handleSubmitDeclineMessage}
        />
      </Box>
    );
  }
  if (change.type === "ROLLBACKED" && change.state === "SEEN") {
    return (
      <Alert
        severity="success"
        sx={{
          fontSize: "16px",
        }}
      >
        {intl.formatMessage({ id: "rollback-acknowledged" })}
      </Alert>
    );
  }

  return <div></div>;
};

export default ChangeResolvedState;
