import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useIntl } from "react-intl";

interface PublicationHeaderProps {
  label: string;
  state: string;
}

const PublicationHeader: React.FC<PublicationHeaderProps> = ({
  label,
  state,
}) => {
  const intl = useIntl();
  return (
    <Paper>
      <Box p={2}>
        <Typography variant={"h5"}>{label}</Typography>
        {state === "IN_PROGRESS" && (
          <Typography variant={"body1"} color="text.secondary">
            {intl.formatMessage({ id: "publication-summary-description" })}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 2 }} pt={2}>
          <Button variant={"contained"} color={"success"} disabled={true}>
            Odevzdat revizi
          </Button>
          <Button variant={"contained"} color={"error"}>
            Zamítnout publikaci
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PublicationHeader;
