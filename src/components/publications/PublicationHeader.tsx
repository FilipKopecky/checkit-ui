import React from "react";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import { PublicationContextState } from "../../model/Publication";

interface PublicationHeaderProps {
  label: string;
  state: PublicationContextState;
  gestored: boolean;
}

const PublicationHeader: React.FC<PublicationHeaderProps> = ({
  label,
  state,
  gestored,
}) => {
  const intl = useIntl();
  let publicationStateMessage = "";
  let alertType: AlertColor;

  switch (state) {
    case "CREATED":
      publicationStateMessage = "publication-summary-description-created";
      alertType = "info";
      break;
    case "APPROVABLE":
      publicationStateMessage = "publication-summary-description-approved";
      alertType = "success";
      break;
    case "REJECTED":
      publicationStateMessage = "publication-summary-description-rejected";
      alertType = "error";
      break;
    case "WAITING_FOR_OTHERS":
      publicationStateMessage = "publication-summary-description-waiting";
      alertType = "info";
      break;
    default:
      publicationStateMessage = "something-went-wrong";
      alertType = "error";
  }

  return (
    <Paper>
      <Box p={3}>
        <Typography variant={"h4"}>{label}</Typography>
        <Alert
          severity={alertType}
          sx={{ fontSize: "16px", marginTop: 1, marginBottom: 1 }}
        >
          {intl.formatMessage({
            id: publicationStateMessage,
          })}
        </Alert>
        {gestored && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color={"success"}
              variant={"contained"}
              disabled={state !== "APPROVABLE"}
            >
              {intl.formatMessage({ id: "publication-submit" })}
            </Button>
            {state !== "APPROVABLE" && (
              <Button variant={"contained"} color={"error"}>
                {intl.formatMessage({ id: "publication-decline" })}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default PublicationHeader;
