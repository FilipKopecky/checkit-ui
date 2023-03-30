import React from "react";
import { useIntl } from "react-intl";
import { Typography, TypographyProps } from "@mui/material";
import { UriToTranslationMapper } from "../../utils/ChangeUtils";

interface MappedLabelProps {
  uri: string;
}

const MappedLabel: React.FC<MappedLabelProps & TypographyProps> = ({
  uri,
  ...props
}) => {
  const intl = useIntl();
  const displayedLabel = UriToTranslationMapper[uri]
    ? intl.formatMessage({ id: UriToTranslationMapper[uri].id })
    : uri;
  return (
    <Typography variant={"body1"} {...props}>
      {displayedLabel}
    </Typography>
  );
};

export default MappedLabel;
