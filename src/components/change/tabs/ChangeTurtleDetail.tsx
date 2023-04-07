import React from "react";
import { Change, ChangeType, ObjectData } from "../../../model/Change";
import { Box } from "@mui/material";
import {
  generateTripleFromChange,
  getModificationColor,
} from "../../../utils/ChangeUtils";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import sparql from "react-syntax-highlighter/dist/esm/languages/prism/sparql";
import coldarkCold from "react-syntax-highlighter/dist/esm/styles/prism/coldark-cold";

SyntaxHighlighter.registerLanguage("sparql", sparql);

interface ChangeTurtleDetailProps {
  change: Change;
}

const ChangeTurtleDetail: React.FC<ChangeTurtleDetailProps> = ({ change }) => {
  return (
    <Box>
      <ModifiedTriple
        subject={change.subject}
        predicate={change.predicate}
        object={change.object}
        type={change.type}
      />
      {change.type === "MODIFIED" && (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Arrow fontSize={"large"} />
          </Box>
          <ModifiedTriple
            subject={change.subject}
            predicate={change.predicate}
            object={change.newObject!}
            type={"CREATED"}
          />
        </Box>
      )}
    </Box>
  );
};

interface ModifiedTripleProps {
  subject: string;
  predicate: string;
  object: ObjectData;
  type: ChangeType;
}

const ModifiedTriple: React.FC<ModifiedTripleProps> = ({
  subject,
  predicate,
  object,
  type,
}) => {
  return (
    <Box
      sx={{
        borderLeft: 6,
        borderColor: getModificationColor(type),
        height: "100%",
      }}
    >
      <SyntaxHighlighter language="sparql" style={coldarkCold}>
        {generateTripleFromChange({ subject, predicate, object })}
      </SyntaxHighlighter>
    </Box>
  );
};

const Arrow = styled(ArrowForwardIcon)(({ theme }) => ({
  transform: "rotate(90deg)",
}));

export default ChangeTurtleDetail;
