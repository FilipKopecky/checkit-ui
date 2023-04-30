import React, { useState } from "react";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import { Publication } from "../../model/Publication";
import PublicationSubmitModal from "./PublicationSubmitModal";
import Comment from "../comments/Comment";

interface PublicationHeaderProps {
  gestored: boolean;
  publication: Publication;
}

const PublicationHeader: React.FC<PublicationHeaderProps> = ({
  publication,
  gestored,
}) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  let publicationStateMessage = "";
  let alertType: AlertColor;

  switch (publication.state) {
    case "CREATED":
      publicationStateMessage = "publication-summary-description-created";
      alertType = "info";
      break;
    case "APPROVED":
      publicationStateMessage = "publication-summary-description-approved";
      alertType = "success";
      break;
    case "APPROVABLE":
      publicationStateMessage = "publication-summary-description-approvable";
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

  const openModal = (reject: boolean) => {
    setIsRejected(reject);
    setOpen(true);
  };

  return (
    <div>
      <Paper>
        <Box p={3}>
          <Typography variant={"h4"}>{publication.label}</Typography>
          <Alert
            severity={alertType}
            sx={{ fontSize: "16px", marginTop: 1, marginBottom: 1 }}
          >
            {intl.formatMessage({
              id: publicationStateMessage,
            })}
          </Alert>
          {gestored &&
            publication.state !== "APPROVED" &&
            publication.state !== "REJECTED" && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  color={"success"}
                  variant={"contained"}
                  disabled={publication.state !== "APPROVABLE"}
                  onClick={() => openModal(false)}
                >
                  {intl.formatMessage({ id: "publication-submit" })}
                </Button>
                <Button
                  variant={"contained"}
                  color={"error"}
                  onClick={() => openModal(true)}
                >
                  {intl.formatMessage({ id: "publication-decline" })}
                </Button>
              </Box>
            )}
          {publication.finalComment && (
            <Box
              bgcolor={publication.state === "APPROVED" ? "#EDF7ED" : "#FDEDED"}
              padding={1}
              borderRadius={1}
            >
              <Comment
                comment={publication.finalComment!}
                showDivider={false}
              />
            </Box>
          )}
        </Box>
      </Paper>
      <PublicationSubmitModal
        open={open}
        setOpen={setOpen}
        publication={publication}
        reject={isRejected}
      />
    </div>
  );
};

export default PublicationHeader;
