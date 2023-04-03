import React from "react";
import PublicationsList from "./publications/PublicationsList";
import { Box, Grid, Paper } from "@mui/material";
import IslandHeader from "./misc/IslandHeader";
import { useIntl } from "react-intl";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import { useGetRelevantPublicationsQuery } from "../api/publicationApi";
import LoadingOverlay from "./misc/LoadingOverlay";
import ErrorAlert from "./misc/ErrorAlert";

const data = [
  { name: "Nezkontrolovaných změn", value: 150 },
  { name: "Zkontrolovaných změn", value: 30 },
];
const data2 = [
  {
    name: "COUNCIL DIRECTIVE 1999/37/EC on the registration documents for vehicles",
    shorten: "Publikace 1",
    uv: 20,
    pv: 190,
  },
  {
    name: "REGULATION (EU) 2018/858 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL on the approval and market surveillance of motor vehicles and their trailers, and of systems, components and separate technical units intended for such vehicles",
    shorten: "Publikace 2",
    uv: 50,
    pv: 250,
  },
  {
    name: "Datový slovník Poslanecké sněmovny Parlamentu České republiky - slovník",
    shorten: "Publikace 3",
    uv: 10,
    pv: 20,
  },
];

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
        <Grid container item md={12} xs={12} spacing={2}>
          <Grid item md={3}>
            <Paper sx={{ height: "100%" }}>
              <PieChart
                data={data}
                label={"Celkem změn"}
                fullCircle={false}
                animation={true}
              />
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Paper>
              <Box pt={2}>
                <BarChart data={data2} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
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
