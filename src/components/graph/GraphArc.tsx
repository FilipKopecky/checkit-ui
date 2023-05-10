import React from "react";
import { Box, Typography } from "@mui/material";
import Cardinality from "./Cardinality";
import { styled } from "@mui/material/styles";
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
        <Typography variant={"button"} fontWeight={600}>
          {arcName}
        </Typography>
        <Cardinality cardinality={cardinalityEnd} />
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Box height={"3px"} width={"100%"} bgcolor={"black"} />
        <Arrow />
      </Box>
    </Box>
  );
};

const Arrow = styled(Box)(({}) => ({
  width: 0,
  height: 0,
  borderTop: "8px solid transparent",
  borderLeft: "8px solid black",
  borderBottom: "8px solid transparent",
}));

export default GraphArc;
