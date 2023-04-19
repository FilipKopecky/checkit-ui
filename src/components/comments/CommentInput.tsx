import React, { useRef } from "react";
import { InputAdornment, OutlinedInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

interface CommentInputProps {
  handleCommentSubmit: (content: string) => void;
  placeholder: string;
}
const CommentInput: React.FC<CommentInputProps> = ({
  handleCommentSubmit,
  placeholder,
}) => {
  const valueRef = useRef<HTMLTextAreaElement>();
  return (
    <OutlinedInput
      placeholder={placeholder}
      fullWidth={true}
      multiline={true}
      inputRef={valueRef}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => {
              handleCommentSubmit(valueRef.current!.value);
              valueRef.current!.value = "";
            }}
          >
            <SendIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default CommentInput;
