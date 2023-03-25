import React from "react";
import { Typography } from "@mui/material";

interface ChangeObjectLabelProps {
  changedObject: string;
}

/**
 * Resolves label or returns uri of changed object
 * @param changedObject Object which label is to be resolved
 * @constructor
 */
const ChangeObjectLabel: React.FC<ChangeObjectLabelProps> = ({
  changedObject,
}) => {
  const displayValue = mockedLabelResolve(changedObject);
  return <Typography variant={"body1"}>{displayValue}</Typography>;
};

const mockedLabelResolve = (changedObject: string) => {
  return changedObject;
};

export default ChangeObjectLabel;
