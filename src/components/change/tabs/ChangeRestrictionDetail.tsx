import React from "react";
import { Restriction } from "../../../model/Restriction";
import { Box } from "@mui/material";
import GraphElement from "../../graph/GraphElement";
import GraphArc from "../../graph/GraphArc";

interface ChangeRestrictionDetailProps {
  restriction: Restriction;
}

const ChangeRestrictionDetail: React.FC<ChangeRestrictionDetailProps> = ({
  restriction,
}) => {
  console.log(restriction);
  return (
    <Box display={"flex"}>
      <GraphElement
        displayName={restriction.startName}
        uri={restriction.startUri}
      />
      <GraphArc
        arcName={restriction.relationName}
        arcUri={restriction.relationUri}
        cardinalityStart={restriction.cardinalityStart}
        cardinalityEnd={restriction.cardinalityEnd}
      />
      <GraphElement
        displayName={restriction.endName}
        uri={restriction.endUri}
      />
    </Box>
  );
};

export default ChangeRestrictionDetail;
