import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  Line,
  YAxis,
} from "recharts";
import { BusinessBox } from "../../entities";
import { ChartContainer } from "./styles";

interface BusinessChartBoxProps {
  title: string;
  data: { year: string; value: number }[];
  stroke: string;
  fill: string;
  dot: any;
}

export const BusinessChartBox = ({
  title,
  data,
  stroke,
  fill,
  dot,
}: BusinessChartBoxProps) => {
  return (
    <BusinessBox title={title}>
      <ChartContainer>
        <AreaChart
          data={data}
          margin={{ top: 15, right: 30, left: 30, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: "1rem" }} interval={0} />
          <YAxis hide />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            fill={fill}
            fillOpacity={0.2}
            dot={dot}
          />
          <Line type="monotone" dataKey="value" stroke={stroke} />
        </AreaChart>
      </ChartContainer>
    </BusinessBox>
  );
};
