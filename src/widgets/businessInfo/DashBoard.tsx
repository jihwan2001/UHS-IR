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
import { DashboardWrapper, ChartContainer } from "./styles";

// 샘플 데이터
const data1 = [
  { year: "2022년", value: 6.3 },
  { year: "2023년", value: 7.5 },
  { year: "2024년", value: 7.6 },
];

const data2 = [
  { year: "2022년", value: 64.7 },
  { year: "2023년", value: 62.2 },
  { year: "2024년", value: 61.8 },
];

// 점 스타일 컴포넌트 그대로 유지
const CustomDot = (props: { cx: any; cy: any; value: any }) => {
  const { cx, cy, value } = props;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="white"
        stroke="#28a745"
        strokeWidth={2}
      />
      <text x={cx} y={cy - 10} textAnchor="middle" fontSize="14px" fill="#333">
        {value}
      </text>
    </g>
  );
};

const CustomDotRed = (props: { cx: any; cy: any; value: any }) => {
  const { cx, cy, value } = props;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="white"
        stroke="#dc3545"
        strokeWidth={2}
      />
      <text x={cx} y={cy - 10} textAnchor="middle" fontSize="14px" fill="#333">
        {value}%
      </text>
    </g>
  );
};

export const DashBoard = () => {
  return (
    <DashboardWrapper>
      {/* 박스 1 - 신입생 경쟁률 */}
      <BusinessBox title="신입생 경쟁률">
        <ChartContainer>
          <AreaChart
            data={data1}
            margin={{ top: 15, right: 20, left: 30, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: "1rem" }} interval={0} />
            <YAxis hide />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#28a745"
              fill="#28a745"
              fillOpacity={0.2}
              dot={CustomDot}
            />
            <Line type="monotone" dataKey="value" stroke="#28a745" />
          </AreaChart>
        </ChartContainer>
      </BusinessBox>

      {/* 박스 2 - 취업률 */}
      <BusinessBox title="취업률">
        <ChartContainer>
          <AreaChart
            data={data2}
            margin={{ top: 15, right: 20, left: 30, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: "1rem" }} interval={0} />
            <YAxis hide />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#dc3545"
              fill="#dc3545"
              fillOpacity={0.2}
              dot={CustomDotRed}
            />
            <Line type="monotone" dataKey="value" stroke="#dc3545" />
          </AreaChart>
        </ChartContainer>
      </BusinessBox>
    </DashboardWrapper>
  );
};
