import React from "react";
import { ChangeState } from "../../model/Change";
import CommentInput from "../comments/CommentInput";
import Comment from "../comments/Comment";
import { CommentData, CommentFormData } from "../../model/CommentData";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";

interface ChangeDeclineMessageProps {
  state: ChangeState;
  declineComment?: CommentData;
  submitDeclineMessage: (data: CommentFormData) => void;
}

const ChangeDeclineMessage: React.FC<ChangeDeclineMessageProps> = ({
  state,
  declineComment,
  submitDeclineMessage,
}) => {
  const intl = useIntl();
  const { handleSubmit, control } = useForm<CommentFormData>({
    defaultValues: {
      commentValue: "",
    },
    mode: "onSubmit",
  });

  if (state !== "REJECTED") return <></>;
  if (!declineComment) {
    return (
      <form onSubmit={handleSubmit(submitDeclineMessage)}>
        <CommentInput
          formProps={{
            control: control,
            name: "commentValue",
            rules: { required: true, minLength: 10 },
          }}
          placeholder={intl.formatMessage({ id: "add-decline-change-message" })}
        />
      </form>
    );
  } else {
    return <Comment comment={declineComment} showDivider={false} />;
  }
};

export default ChangeDeclineMessage;
