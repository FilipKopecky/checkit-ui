import React, { useRef } from "react";
import { Box, InputBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

interface CommentInputProps {
  handleCommentSubmit: (content: string) => void;
}
const CommentInput: React.FC<CommentInputProps> = ({ handleCommentSubmit }) => {
  const valueRef = useRef<HTMLTextAreaElement>();
  return (
    <Box
      border={1}
      borderColor={"#E0E0E0"}
      p={1}
      borderRadius={2}
      flex={1}
      display={"flex"}
    >
      <InputBase
        placeholder={"Text komentáře"}
        fullWidth={true}
        multiline={true}
        inputRef={valueRef}
      />
      <Box display={"flex"} flex={1}>
        <Box alignSelf={"flex-end"}>
          <IconButton
            onClick={() => {
              handleCommentSubmit(valueRef.current!.value);
              valueRef.current!.value = "";
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentInput;
