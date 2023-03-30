import React from "react";
import { ChangeState } from "../../model/Change";
import CommentInput from "../comments/CommentInput";
import Comment from "../comments/Comment";
import { CommentData } from "../../model/CommentData";
import { useIntl } from "react-intl";

interface ChangeDeclineMessageProps {
  state: ChangeState;
  declineComment?: CommentData;
  submitDeclineMessage: (content: string) => void;
}

const ChangeDeclineMessage: React.FC<ChangeDeclineMessageProps> = ({
  state,
  declineComment,
  submitDeclineMessage,
}) => {
  const intl = useIntl();
  if (state !== "REJECTED") return <></>;
  if (!declineComment) {
    return (
      <CommentInput
        handleCommentSubmit={submitDeclineMessage}
        placeholder={intl.formatMessage({ id: "add-decline-change-message" })}
      />
    );
  } else {
    return <Comment comment={declineComment} />;
  }
};

export default ChangeDeclineMessage;
