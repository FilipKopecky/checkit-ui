import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PieChart from "../charts/PieChart";
import { Publication } from "../../model/Publication";
import {
  getStatisticsPercentage,
  parseStatisticsToPieData,
} from "../../utils/Utils";

const CustomPaper = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  fontSize: theme.typography.h5.fontSize,
}));

interface PublicationStatisticsProps {
  publication: Publication;
}

const PublicationStatistics: React.FC<PublicationStatisticsProps> = ({
  publication,
}) => {
  if (!publication.statistics?.reviewableChanges) {
    return <></>;
  }

  const parsedStatistics = parseStatisticsToPieData(publication.statistics);

  const percentage = getStatisticsPercentage(publication.statistics);
  const label = `${percentage}%`;

  return (
    <Grid item md={12} sm={6} xs={12}>
      <CustomPaper>
        <Box py={2}>
          <Typography variant={"h5"}>Stav revize publikace</Typography>
          <PieChart
            data={parsedStatistics}
            label={label}
            fullCircle={false}
            animation={true}
          />
        </Box>
      </CustomPaper>
    </Grid>
  );
};

export default PublicationStatistics;
