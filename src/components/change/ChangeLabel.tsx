import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "@mui/material";
import { PredicateMapper } from "../../utils/ChangeUtils";

interface ChangeLabelProps {
  uri: string;
}
const ChangeLabel: React.FC<ChangeLabelProps> = ({ uri }) => {
  const intl = useIntl();
  const displayedLabel = PredicateMapper[uri]
    ? intl.formatMessage({ id: PredicateMapper[uri].id })
    : uri;
  return <Typography variant={"body1"}>{displayedLabel}</Typography>;
};

export default ChangeLabel;
