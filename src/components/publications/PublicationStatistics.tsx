import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PieChart from "../charts/PieChart";
import { Publication } from "../../model/Publication";
import { parseStatisticsToPieData } from "../../utils/Utils";
import { useIntl } from "react-intl";

const CustomPaper = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  textAlign: "center",
  fontSize: theme.typography.body1.fontSize,
}));

interface PublicationStatisticsProps {
  publication: Publication;
}

const PublicationStatistics: React.FC<PublicationStatisticsProps> = ({
  publication,
}) => {
  const intl = useIntl();
  if (!publication.statistics?.reviewableChanges) {
    return <></>;
  }

  const parsedStatistics = parseStatisticsToPieData(publication.statistics);

  const publicationProgress = intl.formatMessage(
    { id: "publication-progress" },
    {
      reviewed:
        publication.statistics.approvedChanges! +
        publication.statistics.rejectedChanges!,
      total: publication.statistics.reviewableChanges!,
    }
  );

  return (
    <Grid item md={12} sm={6} xs={12}>
      <CustomPaper>
        <Box py={2}>
          <Typography variant={"h5"}>Stav revize publikace</Typography>
          <PieChart
            data={parsedStatistics}
            label={publicationProgress}
            fullCircle={false}
            animation={true}
          />
        </Box>
      </CustomPaper>
    </Grid>
  );
};

export default PublicationStatistics;
