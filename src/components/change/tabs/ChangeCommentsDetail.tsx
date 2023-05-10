import React, { useEffect } from "react";
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
import ListItemText from "@mui/material/ListItemText";
import { useForm } from "react-hook-form";
import { CommentFormData } from "../../../model/CommentData";

interface ChangeCommentsDetailsProps {
  changeUri: string;
  publicationId: string;
  vocabularyUri: string;
}

const ChangeCommentsDetails: React.FC<ChangeCommentsDetailsProps> = ({
  changeUri,
  publicationId,
  vocabularyUri,
}) => {
  const {
    data: comments,
    isLoading,
    error,
  } = useGetChangeCommentsQuery(changeUri);
  const [addComment, { isLoading: isUpdating }] = useAddCommentMutation();
  const handleCommentSubmit = (data: CommentFormData) => {
    addComment({
      uri: changeUri,
      content: data.commentValue,
      publicationId: publicationId,
      vocabularyUri: vocabularyUri,
    });
  };
  const intl = useIntl();

  const { handleSubmit, control, reset, formState } = useForm<CommentFormData>({
    defaultValues: {
      commentValue: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ commentValue: "" });
    }
  }, [formState, reset]);

  if (error) return <ErrorAlert />;

  return (
    <Box>
      <form onSubmit={handleSubmit(handleCommentSubmit)}>
        <CommentInput
          isLoading={isUpdating}
          placeholder={intl.formatMessage({ id: "add-comment-placeholder" })}
          formProps={{
            control: control,
            name: "commentValue",
            rules: { required: true },
          }}
        />
      </form>
      {isLoading ? (
        <Box py={2}>
          <CircularProgress color={"inherit"} size={20} />
        </Box>
      ) : (
        <List>
          {comments!.length === 0 ? (
            <ListItemText
              sx={{ paddingLeft: 1 }}
              primary={intl.formatMessage({ id: "no-comments" })}
            />
          ) : (
            comments!.map((comment, index) => {
              return (
                <Comment
                  key={comment.uri}
                  comment={comment}
                  showDivider={index !== comments!.length - 1}
                />
              );
            })
          )}
        </List>
      )}
    </Box>
  );
};

export default ChangeCommentsDetails;
