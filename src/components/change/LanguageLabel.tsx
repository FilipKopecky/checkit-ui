import React from "react";
import { useIntl } from "react-intl";
import { ObjectData } from "../../model/Change";
import { Typography } from "@mui/material";

interface LanguageLabelProps {
  object: ObjectData;
}
const LanguageLabel: React.FC<LanguageLabelProps> = ({ object }) => {
  const intl = useIntl();
  if (!object.languageTag) return <></>;
  const lanTag = `tag-${object.languageTag}`;
  let resolvedLanguageLabel;
  if (intl.messages[lanTag]) {
    resolvedLanguageLabel = intl.formatMessage({ id: lanTag });
  } else {
    resolvedLanguageLabel = object.languageTag;
  }
  return (
    <Typography variant={"body2"} color={"text.secondary"}>
      {resolvedLanguageLabel}
    </Typography>
  );
};

export default LanguageLabel;
