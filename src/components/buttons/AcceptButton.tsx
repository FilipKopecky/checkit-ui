import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { useIntl } from "react-intl";

interface AcceptButtonProps {
  labelKey?: string;
}
const AcceptButton: React.FC<ButtonProps & AcceptButtonProps> = ({
  labelKey,
  ...props
}) => {
  const intl = useIntl();
  return (
    <Button
      variant="outlined"
      color={"success"}
      sx={{ marginRight: 2 }}
      {...props}
    >
      {intl.formatMessage({ id: labelKey ?? "accept" })}
    </Button>
  );
};

export default AcceptButton;
