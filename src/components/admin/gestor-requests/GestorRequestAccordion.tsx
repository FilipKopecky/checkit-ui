import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import { VocabularyData } from "../../../model/Vocabulary";
import GestorRequestUserAction from "./GestorRequestUserAction";
import { useIntl } from "react-intl";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { GestorRequest } from "../../../model/GestorRequest";
import { useResolveGestorRequestMutation } from "../../../api/adminApi";

interface GestorRequestAccordionProps {
  vocabulary: VocabularyData;
  gestorRequests: GestorRequest[];
}
const GestorRequestAccordion: React.FC<GestorRequestAccordionProps> = ({
  vocabulary,
  gestorRequests,
}) => {
  const intl = useIntl();
  const [resolveGestorRequest] = useResolveGestorRequestMutation();
  const handleCallback = (request: GestorRequest, accepted: boolean) => {
    resolveGestorRequest({
      approved: accepted,
      id: request.id,
      state: accepted ? "accepted" : "declined",
    });
  };

  return (
    <Box px={2} sx={{ color: "white" }}>
      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: "background.default",
            color: "black",
          }}
          expandIcon={<ExpandMoreIcon color={"primary"} />}
        >
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
              flex: 1,
            }}
          >
            <Typography variant={"body1"}>{vocabulary.label}</Typography>
            <Box sx={{ textTransform: "uppercase", marginRight: 2 }}>
              {gestorRequests.some((request) => request.state === "pending") ? (
                <Chip
                  label={intl.formatMessage({ id: "pending" })}
                  color="warning"
                  variant="filled"
                  icon={<PendingActionsIcon />}
                  sx={{ paddingLeft: 1, paddingRight: 1 }}
                />
              ) : (
                <Chip
                  label={intl.formatMessage({ id: "done" })}
                  color="success"
                  variant="filled"
                  icon={<ThumbUpAltOutlinedIcon />}
                  sx={{ paddingLeft: 1, paddingRight: 1 }}
                />
              )}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {gestorRequests.map((request) => {
              return (
                <GestorRequestUserAction
                  user={request.applicant}
                  vocabulary={vocabulary}
                  key={request.applicant.id + vocabulary.uri}
                  performActionCallback={handleCallback}
                  gestorRequest={request}
                />
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default GestorRequestAccordion;
