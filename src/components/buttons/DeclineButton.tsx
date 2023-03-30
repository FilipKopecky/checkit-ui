import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { useIntl } from "react-intl";

const DeclineButton: React.FC<ButtonProps> = ({ ...props }) => {
  const intl = useIntl();
  return (
    <Button variant="outlined" color={"error"} {...props}>
      {intl.formatMessage({ id: "decline" })}
    </Button>
  );
};

export default DeclineButton;
