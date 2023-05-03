import React from "react";
import { Typography, TypographyProps } from "@mui/material";
import { UriToTranslationMapper } from "../../utils/ChangeUtils";
import MappedLabel from "./MappedLabel";

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
  if (UriToTranslationMapper[objectUri]) {
    return <MappedLabel uri={objectUri} />;
  }
  return (
    <Typography variant={"body1"} {...props}>
      {objectUri ?? "BLANK NODE"}
    </Typography>
  );
};

export default ObjectLabel;
