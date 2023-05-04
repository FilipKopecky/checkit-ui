import React from "react";
import { Alert, Box, Button } from "@mui/material";
import ChangeResolveAction from "./ChangeResolveAction";
import ChangeDeclineMessage from "./ChangeDeclineMessage";
import { Change, ChangeState } from "../../model/Change";
import { useIntl } from "react-intl";
import { useAddRejectionChangeCommentMutation } from "../../api/commentApi";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";
import { useSnackbar } from "notistack";
import { CommentFormData } from "../../model/CommentData";
import { scrollToNextAvailableItem } from "../../slices/eventSlice";
import Comment from "../comments/Comment";

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
  const currentUser = useAppSelector(selectUser);
  const [addRejectComment] = useAddRejectionChangeCommentMutation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const handleSubmitDeclineMessage = (data: CommentFormData) => {
    addRejectComment({
      topic: change.uri,
      content: data.commentValue,
      publicationId: change.publicationId,
      vocabularyUri: change.vocabularyUri,
      author: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      },
    })
      .unwrap()
      .catch(() => {
        enqueueSnackbar(intl.formatMessage({ id: "something-went-wrong" }), {
          variant: "error",
        });
      });
    dispatch(scrollToNextAvailableItem(change.id));
  };

  return (
    <Box mt={4}>
      {change.state === "NOT_REVIEWED" &&
        change.gestored &&
        !change.readOnly && (
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
            submitDeclineMessage={handleSubmitDeclineMessage}
          />
        </Box>
      )}
      {change.rejectionCommentsOfOthers && (
        <Box>
          <Alert severity="error" sx={{ fontSize: "16px" }}>
            {intl.formatMessage({ id: "change-rejected-by-other" })}
          </Alert>
          {change.rejectionCommentsOfOthers.map((comment) => (
            <Comment comment={comment} showDivider={false} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ChangeActions;
