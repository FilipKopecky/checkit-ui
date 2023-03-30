import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { useIntl } from "react-intl";

const AcceptButton: React.FC<ButtonProps> = ({ ...props }) => {
  const intl = useIntl();
  return (
    <Button
      variant="outlined"
      color={"success"}
      sx={{ marginRight: 2 }}
      {...props}
    >
      {intl.formatMessage({ id: "accept" })}
    </Button>
  );
};

export default AcceptButton;
