import React from "react";
import { useIntl } from "react-intl";
import { Typography, TypographyProps } from "@mui/material";
import { PredicateMapper } from "../../utils/ChangeUtils";

interface ChangeLabelProps {
  uri: string;
  prependText?: string;
}

const ChangeLabel: React.FC<ChangeLabelProps & TypographyProps> = ({
  uri,
  prependText,
  ...props
}) => {
  const intl = useIntl();
  const displayedLabel = PredicateMapper[uri]
    ? intl.formatMessage({ id: PredicateMapper[uri].id })
    : uri;
  return (
    <Typography variant={"body1"} {...props}>
      {prependText}
      {prependText ? displayedLabel.toLowerCase() : displayedLabel}
    </Typography>
  );
};

export default ChangeLabel;
