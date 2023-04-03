import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useIntl } from "react-intl";

const ErrorAlert: React.FC = () => {
  const intl = useIntl();
  return (
    <Alert severity="error">
      <AlertTitle>
        {intl.formatMessage({ id: "something-went-wrong-header" })}
      </AlertTitle>
      {intl.formatMessage({ id: "something-went-wrong" })}
    </Alert>
  );
};

export default ErrorAlert;
