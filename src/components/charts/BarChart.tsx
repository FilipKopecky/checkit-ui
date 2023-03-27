import React from "react";
import {
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
  BarChart as BarChartRechart,
} from "recharts";

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <Text x={x} y={y} width={150} textAnchor="middle" verticalAnchor="start">
      {payload.value.substring(0, 50)}
    </Text>
  );
};

interface BarChartProps {
  data: any;
}
const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChartRechart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={"name"}
          interval={0}
          tick={<CustomizedAxisTick />}
          height={32}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="pv" fill="#02316a" />
        <Bar dataKey="uv" fill="#0FA958" />
      </BarChartRechart>
    </ResponsiveContainer>
  );
};

export default BarChart;
