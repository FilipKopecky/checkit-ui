import React from "react";
import Comment from "../../comments/Comment";
import List from "@mui/material/List";
import { Box } from "@mui/material";
import CommentInput from "../../comments/CommentInput";
import { useIntl } from "react-intl";
import {
  useAddCommentMutation,
  useGetChangeCommentsQuery,
} from "../../../api/commentApi";
import ErrorAlert from "../../misc/ErrorAlert";
import CircularProgress from "@mui/material/CircularProgress";

interface ChangeCommentsDetailsProps {
  changeUri: string;
}

const ChangeCommentsDetails: React.FC<ChangeCommentsDetailsProps> = ({
  changeUri,
}) => {
  const {
    data: comments,
    isLoading,
    error,
  } = useGetChangeCommentsQuery(changeUri);
  const [addComment] = useAddCommentMutation();
  const handleCommentSubmit = (commentText: string) => {
    addComment({ uri: changeUri, content: commentText });
  };
  const intl = useIntl();
  if (error) return <ErrorAlert />;

  return (
    <Box>
      <CommentInput
        handleCommentSubmit={handleCommentSubmit}
        placeholder={intl.formatMessage({ id: "add-comment-placeholder" })}
      />
      {isLoading ? (
        <Box py={2}>
          <CircularProgress color={"inherit"} size={20} />
        </Box>
      ) : (
        <List>
          {comments!.map((comment, index) => {
            return (
              <Comment
                key={comment.uri}
                comment={comment}
                showDivider={index !== comments!.length - 1}
              />
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default ChangeCommentsDetails;
