import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import { Vocabulary } from "../../../model/Vocabulary";
import { User } from "../../../model/User";
import GestorRequestUserAction from "./GestorRequestUserAction";

interface GestorRequestAccordionProps {
  vocabulary: Vocabulary;
  users: User[];
}
const GestorRequestAccordion: React.FC<GestorRequestAccordionProps> = ({
  vocabulary,
  users,
}) => {
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
          <Typography variant={"body1"}>{vocabulary.label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {users.map((user) => {
              return (
                <GestorRequestUserAction
                  user={user}
                  vocabulary={vocabulary}
                  key={user.id + vocabulary.uri}
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
