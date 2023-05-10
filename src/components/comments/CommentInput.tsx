import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { CommentFormData } from "../../model/CommentData";
import { useIntl } from "react-intl";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

interface CommentInputProps {
  placeholder: string;
  formProps: UseControllerProps<CommentFormData>;
  isLoading?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({
  placeholder,
  formProps,
  isLoading,
}) => {
  const { field, fieldState } = useController(formProps);
  const intl = useIntl();
  const getHelperText = (): string => {
    if (formProps.rules?.minLength) {
      return intl.formatMessage(
        { id: "error-text-length" },
        { num: formProps.rules?.minLength?.toString() }
      );
    } else {
      return intl.formatMessage({ id: "error-field-required" });
    }
  };
  return (
    <TextField
      placeholder={placeholder}
      fullWidth={true}
      multiline={true}
      inputRef={field.ref}
      {...field}
      error={!!fieldState.error}
      helperText={fieldState.error ? getHelperText() : ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton type={"submit"}>
                <SendIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CommentInput;
