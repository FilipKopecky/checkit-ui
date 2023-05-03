import React, { useMemo } from "react";
import { Change, ChangeType } from "../../../model/Change";
import { Box } from "@mui/material";
import {
  ChangeWrapper,
  generateRestrictionTurtle,
  generateTripleFromChange,
  getModificationColor,
  parseRestrictionChangeToStructure,
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
  const structure = useMemo(() => {
    if (change.object.restriction) {
      return parseRestrictionChangeToStructure(change);
    }
    return null;
  }, [change]);

  if (structure) {
    return (
      <RestrictionTurtle type={structure.change.type} change={structure} />
    );
  }

  return (
    <Box>
      <ModifiedTriple change={change} />
      {change.newObject && (
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
            change={{
              ...change,
              subject: change.subject,
              predicate: change.predicate,
              object: change.newObject!,
              type: "CREATED",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

interface ModifiedTripleProps {
  change: Change;
}

const ModifiedTriple: React.FC<ModifiedTripleProps> = ({ change }) => {
  return (
    <Box
      sx={{
        borderLeft: 6,
        borderColor: getModificationColor(change.type),
        height: "100%",
      }}
    >
      <SyntaxHighlighter language="sparql" style={coldarkCold}>
        {generateTripleFromChange(change)}
      </SyntaxHighlighter>
    </Box>
  );
};

interface RestrictionTurtleProps {
  type: ChangeType;
  change: ChangeWrapper;
}

const RestrictionTurtle: React.FC<RestrictionTurtleProps> = ({
  type,
  change,
}) => {
  return (
    <Box
      sx={{
        borderLeft: 6,
        borderColor: getModificationColor(type),
        height: "100%",
      }}
    >
      <SyntaxHighlighter
        language="sparql"
        style={coldarkCold}
        wrapLines={true}
        wrapLongLines={true}
      >
        {generateRestrictionTurtle(change)}
      </SyntaxHighlighter>
    </Box>
  );
};

const Arrow = styled(ArrowForwardIcon)(({ theme }) => ({
  transform: "rotate(90deg)",
}));

export default ChangeTurtleDetail;
