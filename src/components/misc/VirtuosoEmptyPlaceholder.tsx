import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useIntl } from "react-intl";

const EmptyPlaceholder: React.FC = () => {
  const intl = useIntl();
  return (
    <ListItemText
      sx={{ paddingLeft: 1 }}
      primary={intl.formatMessage({ id: "no-result" })}
    />
  );
};

export default EmptyPlaceholder;
