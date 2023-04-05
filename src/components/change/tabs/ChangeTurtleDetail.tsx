import React from "react";
import { Change, ChangeType } from "../../../model/Change";
import { Box } from "@mui/material";
import {
  generateTripleFromChange,
  getModificationColor,
} from "../../../utils/ChangeUtils";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ChangeTurtleDetailProps {
  change: Change;
}

const ChangeTurtleDetail: React.FC<ChangeTurtleDetailProps> = ({ change }) => {
  return (
    <Box>
      <ModifiedTriple
        subject={change.subject}
        predicate={change.predicate}
        object={change.object.value}
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
            object={change.newObject!.value}
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
  object: string;
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
        paddingLeft: 2,
        height: "100%",
      }}
    >
      <p style={{ whiteSpace: "pre-wrap" }}>
        {generateTripleFromChange({ subject, predicate, object })}
      </p>
    </Box>
  );
};

const Arrow = styled(ArrowForwardIcon)(({ theme }) => ({
  transform: "rotate(90deg)",
}));

export default ChangeTurtleDetail;
