import React, { useState } from "react";
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
import { Vocabulary } from "../../../model/Vocabulary";
import { User } from "../../../model/User";
import GestorRequestUserAction from "./GestorRequestUserAction";
import { useIntl } from "react-intl";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

interface GestorRequestAccordionProps {
  vocabulary: Vocabulary;
  users: User[];
}
const GestorRequestAccordion: React.FC<GestorRequestAccordionProps> = ({
  vocabulary,
  users,
}) => {
  const intl = useIntl();
  const [reviewsDone, setReviewDone] = useState<number>(0);

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
              {reviewsDone !== users.length ? (
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
            {users.map((user) => {
              return (
                <GestorRequestUserAction
                  user={user}
                  vocabulary={vocabulary}
                  key={user.id + vocabulary.uri}
                  performActionCallback={() => setReviewDone(reviewsDone + 1)}
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
