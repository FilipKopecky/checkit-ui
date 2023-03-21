import React from "react";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const data = [
  { name: "Nezkontrolovaných změn", value: 30 },
  { name: "Zkontrolovaných změn", value: 70 },
];

const COLORS = ["#FFC12C", "#0FA958"];

const CustomPaper = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  fontSize: theme.typography.h5.fontSize,
}));

const PublicationStatistics: React.FC = () => {
  return (
    <CustomPaper>
      <Box py={2}>
        <Typography variant={"h5"}>Zkontrolovaných změn</Typography>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={90}
              outerRadius={110}
              endAngle={180}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              cx={"50%"}
              cy={"90%"}
              isAnimationActive={false}
            >
              <Label position="center">70%</Label>
              {data.map((entry, index) => (
                <Cell
                  style={{ outline: "none" }}
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </CustomPaper>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper>
        <Box p={2}>
          <Typography>{`${payload[0].name} : ${payload[0].value}`}</Typography>
        </Box>
      </Paper>
    );
  }

  return null;
};

export default PublicationStatistics;
