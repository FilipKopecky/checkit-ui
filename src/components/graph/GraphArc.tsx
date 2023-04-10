import React from "react";
import { Box, Typography } from "@mui/material";
import Cardinality from "./Cardinality";
interface GraphArcProps {
  arcName: string;
  arcUri: string;
  cardinalityStart: {
    min: number;
    max?: number;
  };
  cardinalityEnd: {
    min: number;
    max?: number;
  };
}

const GraphArc: React.FC<GraphArcProps> = ({
  arcName,
  arcUri,
  cardinalityStart,
  cardinalityEnd,
}) => {
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} minWidth={300}>
        <Cardinality cardinality={cardinalityStart} />
        <Typography variant={"caption"}>{arcName}</Typography>
        <Cardinality cardinality={cardinalityEnd} />
      </Box>
      <Box display={"flex"}>
        <Box height={"3px"} width={"100%"} bgcolor={"black"} />
      </Box>
    </Box>
  );
};

export default GraphArc;
