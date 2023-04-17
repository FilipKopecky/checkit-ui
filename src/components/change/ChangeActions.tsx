import React from "react";
import { Alert, Box, Button } from "@mui/material";
import ChangeResolveAction from "./ChangeResolveAction";
import ChangeDeclineMessage from "./ChangeDeclineMessage";
import { Change, ChangeState } from "../../model/Change";
import { useIntl } from "react-intl";
import { useAddRejectionChangeCommentMutation } from "../../api/commentApi";

interface ChangeActionsProps {
  change: Change;
  handleResolution: (state: ChangeState) => void;
  handleClear: () => void;
}

const ChangeActions: React.FC<ChangeActionsProps> = ({
  change,
  handleResolution,
  handleClear,
}) => {
  const intl = useIntl();
  //TODO: Add spinner or do optimistic update
  const [addRejectComment] = useAddRejectionChangeCommentMutation();
  return (
    <Box mt={4}>
      {change.state === "NOT_REVIEWED" && change.gestored && (
        <ChangeResolveAction handleResolution={handleResolution} />
      )}
      {change.state === "APPROVED" && (
        <Alert
          severity="success"
          sx={{
            fontSize: "16px",
          }}
          action={
            <Button color="inherit" size="small" onClick={handleClear}>
              {intl.formatMessage({ id: "undo" })}
            </Button>
          }
        >
          {intl.formatMessage({ id: "accepted" })}
        </Alert>
      )}
      {change.state === "REJECTED" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Alert
            severity="error"
            sx={{ fontSize: "16px" }}
            action={
              <Button color="inherit" size="small" onClick={handleClear}>
                {intl.formatMessage({ id: "undo" })}
              </Button>
            }
          >
            {intl.formatMessage({ id: "declined" })}
          </Alert>
          <ChangeDeclineMessage
            state={change.state}
            declineComment={change.rejectionComment}
            submitDeclineMessage={(content) => {
              addRejectComment({
                uri: change.uri,
                content: content,
                publicationId: change.publicationId,
                vocabularyUri: change.vocabularyUri,
              });
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ChangeActions;
