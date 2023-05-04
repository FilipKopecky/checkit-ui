import React from "react";
import PublicationsList from "./publications/PublicationsList";
import { Box, Grid, Paper, Tab, Tabs } from "@mui/material";
import IslandHeader from "./misc/IslandHeader";
import { useIntl } from "react-intl";
import { useGetRelevantPublicationsQuery } from "../api/publicationApi";
import LoadingOverlay from "./misc/LoadingOverlay";
import ErrorAlert from "./misc/ErrorAlert";
import ClosedPublications from "./publications/ClosedPublications";
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import {
  changePublicationTab,
  selectPublications,
} from "../slices/publicationsSlice";

let voidValue = (function () {})();
const PublicationsHub: React.FC = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const publicationsSelector = useAppSelector(selectPublications);
  const {
    data: availablePublications,
    isLoading,
    error,
  } = useGetRelevantPublicationsQuery(voidValue, {
    refetchOnMountOrArgChange: true,
  });
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(changePublicationTab(newValue));
  };

  if (isLoading) return <LoadingOverlay />;
  if (error || !availablePublications) return <ErrorAlert />;

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Paper>
            <IslandHeader
              header={intl.formatMessage({ id: "available-publications" })}
            >
              <Tabs
                value={publicationsSelector.activeTab}
                onChange={handleTabChange}
              >
                <Tab
                  value={"available"}
                  label={intl.formatMessage({ id: "open-publications" })}
                />
                <Tab
                  value={"closed"}
                  label={intl.formatMessage({ id: "closed-publications" })}
                />
              </Tabs>
            </IslandHeader>
            <Box pl={3} pb={1}></Box>

            <Box px={3}>
              {publicationsSelector.activeTab === "available" ? (
                <PublicationsList publications={availablePublications} />
              ) : (
                <ClosedPublications />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationsHub;
