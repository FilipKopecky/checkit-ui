import React from "react";
import { useIntl } from "react-intl";
import { Typography, TypographyProps } from "@mui/material";
import { PredicateMapper } from "../../utils/ChangeUtils";

interface ChangePredicateLabelProps {
  uri: string;
}

const ChangePredicateLabel: React.FC<
  ChangePredicateLabelProps & TypographyProps
> = ({ uri, ...props }) => {
  const intl = useIntl();
  const displayedLabel = PredicateMapper[uri]
    ? intl.formatMessage({ id: PredicateMapper[uri].id })
    : uri;
  return (
    <Typography variant={"body1"} {...props}>
      {displayedLabel}
    </Typography>
  );
};

export default ChangePredicateLabel;
