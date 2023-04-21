import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PieChart from "../charts/PieChart";
import { Publication } from "../../model/Publication";

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
  const approvedChanges = publication.statistics.approvedChanges ?? 0;
  const rejectedChanges = publication.statistics.rejectedChanges ?? 0;
  const parsedStatistics = [
    {
      name: "pie-chart-not-reviewed",
      value:
        publication.statistics.reviewableChanges -
        approvedChanges -
        rejectedChanges,
    },
    {
      name: "pie-chart-accepted",
      value: approvedChanges,
    },
    {
      name: "pie-chart-rejected",
      value: rejectedChanges,
    },
  ];

  const percentage = Math.trunc(
    ((approvedChanges + rejectedChanges) /
      publication.statistics.reviewableChanges) *
      100
  );
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
