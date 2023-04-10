import React from "react";
import { Box, Typography } from "@mui/material";

interface CardinalityProps {
  cardinality: { min: number; max?: number };
}

const Cardinality: React.FC<CardinalityProps> = ({ cardinality }) => {
  let parsedCardinality = `${cardinality.min}`;
  if (cardinality.min !== cardinality.max) {
    if (cardinality.max) {
      parsedCardinality += ` .. ${cardinality.max}`;
    } else {
      parsedCardinality += ` .. *`;
    }
  }
  return (
    <Box px={1}>
      <Typography variant={"caption"}>{parsedCardinality}</Typography>
    </Box>
  );
};

export default Cardinality;
