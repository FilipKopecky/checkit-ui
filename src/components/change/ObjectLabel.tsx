import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface ObjectLabelProps {
  objectUri: string;
}

/**
 * Resolves label or returns uri of changed object
 * @param changedObject Object which label is to be resolved
 * @constructor
 */
const ObjectLabel: React.FC<ObjectLabelProps & TypographyProps> = ({
  objectUri,
  ...props
}) => {
  const displayValue = mockedLabelResolve(objectUri);
  return (
    <Typography variant={"body1"} {...props}>
      {displayValue}
    </Typography>
  );
};

const mockedLabelResolve = (changedObject: string) => {
  if (
    changedObject ===
    "http://onto.fel.cvut.cz/ontologies/slovnik/decree-no-268-2009/pojem/building"
  )
    return "Budova";
  return changedObject;
};

export default ObjectLabel;
