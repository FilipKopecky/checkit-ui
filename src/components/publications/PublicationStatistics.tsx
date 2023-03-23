import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PieChart from "../charts/PieChart";

const data = [
  { name: "Nezkontrolovaných změn", value: 10 },
  { name: "Zkontrolovaných změn", value: 20 },
];

const CustomPaper = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  fontSize: theme.typography.h5.fontSize,
}));

const PublicationStatistics: React.FC = () => {
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
