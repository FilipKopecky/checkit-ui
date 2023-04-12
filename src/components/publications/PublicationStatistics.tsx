import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PieChart from "../charts/PieChart";
import { Publication } from "../../model/Publication";

const data = [
  { name: "pie-chart-not-reviewed", value: 10 },
  { name: "pie-chart-reviewed", value: 20 },
];

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
  //TODO: Make this component use real data
  // Fetch all changes from the affected vocabularies -> calculate following values: reviewed, not-reviewed, review-by-others, not-reviewed-by-others
  const sum = data.reduce(
    (partialResult, dataItem) => partialResult + dataItem.value,
    0
  );
  const percentage = Math.trunc((data[data.length - 1].value / sum) * 100);
  const label = `${percentage}%`;

  return (
    <CustomPaper>
      <Box py={2}>
        <Typography variant={"h5"}>Stav revize publikace</Typography>
        <PieChart
          data={data}
          label={label}
          fullCircle={false}
          animation={true}
        />
      </Box>
    </CustomPaper>
  );
};

export default PublicationStatistics;
