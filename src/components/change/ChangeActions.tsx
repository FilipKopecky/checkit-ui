import React from "react";
import { Alert, Box } from "@mui/material";
import ChangeResolveAction from "./ChangeResolveAction";
import { Change, ChangeState } from "../../model/Change";
import { useIntl } from "react-intl";
import { useAddRejectionChangeCommentMutation } from "../../api/commentApi";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";
import { useSnackbar } from "notistack";
import { CommentFormData } from "../../model/CommentData";
import { scrollToNextAvailableItem } from "../../slices/eventSlice";
import Comment from "../comments/Comment";
import ChangeResolvedState from "./ChangeResolvedState";

interface ChangeActionsProps {
  change: Change;
  handleResolution: (state: ChangeState) => void;
  handleClear: (state?: ChangeState) => void;
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

  //TODO: Jiný alert pro state SEEN
  return (
    <Box mt={4}>
      <ChangeResolveAction
        change={change}
        handleResolution={handleResolution}
        handleClear={handleClear}
      />
      <ChangeResolvedState
        change={change}
        handleClear={handleClear}
        handleSubmitDeclineMessage={handleSubmitDeclineMessage}
      />
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
