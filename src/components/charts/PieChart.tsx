import React from "react";
import {
  Cell,
  Label,
  Pie,
  ResponsiveContainer,
  Tooltip,
  PieChart as PieChartRechart,
} from "recharts";
import { Box, Paper, Typography } from "@mui/material";

interface PieChartProps {
  data: { name: string; value: number }[];
  label: string;
  fullCircle?: boolean;
  animation?: boolean;
}

const COLORS = ["#FFC12C", "#0FA958"];
const PieChart: React.FC<PieChartProps> = ({
  data,
  label,
  fullCircle = true,
  animation = false,
}) => {
  return (
    <ResponsiveContainer width="100%" height={fullCircle ? 300 : 150}>
      <PieChartRechart>
        <Pie
          data={data}
          innerRadius={90}
          outerRadius={110}
          endAngle={fullCircle ? 360 : 180}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          cx={"50%"}
          cy={fullCircle ? "50%" : "90%"}
          isAnimationActive={animation}
        >
          <Label position="center">{label}</Label>
          {data.map((entry, index) => (
            <Cell
              style={{ outline: "none" }}
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
      </PieChartRechart>
    </ResponsiveContainer>
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

export default PieChart;
