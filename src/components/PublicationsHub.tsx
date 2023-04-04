import React from "react";
import PublicationsList from "./publications/PublicationsList";
import { Box, Grid, Paper } from "@mui/material";
import IslandHeader from "./misc/IslandHeader";
import { useIntl } from "react-intl";
import { useGetRelevantPublicationsQuery } from "../api/publicationApi";
import LoadingOverlay from "./misc/LoadingOverlay";
import ErrorAlert from "./misc/ErrorAlert";

const PublicationsHub: React.FC = () => {
  const intl = useIntl();
  const {
    data: availablePublications,
    isLoading,
    error,
  } = useGetRelevantPublicationsQuery();
  if (isLoading) return <LoadingOverlay />;
  if (error || !availablePublications) return <ErrorAlert />;

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Paper>
            <IslandHeader
              header={intl.formatMessage({ id: "available-publications" })}
            />
            <Box px={3}>
              <PublicationsList publications={availablePublications} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationsHub;
