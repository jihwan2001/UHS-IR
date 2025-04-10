import { PieChart, Pie, Cell } from "recharts";
import { BusinessBox } from "./BusinessBox";

type DonutChartProps = {
  title: string;
  unit?: string;
  percent: number;
  color: string;
  description?: string;
  key?: string;
};

export const DonutChartBox = ({
  title,
  unit,
  percent,
  color,
  description,
}: DonutChartProps) => {
  const isTuitionRate = title === "등록금 대비 교육비";

  const data = isTuitionRate
    ? [
        { name: "만족", value: 100 },
        { name: "기타", value: 0 },
      ]
    : [
        { name: "만족", value: percent },
        { name: "기타", value: 100 - percent },
      ];

  return (
    <BusinessBox title={title} unit={unit}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // 👈 차트와 텍스트를 수직 중앙 정렬
        }}
      >
        <div style={{ position: "relative", width: 200, height: 200 }}>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? color : "#e9ecef"}
                />
              ))}
            </Pie>
          </PieChart>

          {/* 퍼센트 중앙 텍스트 */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {percent}%
          </div>
        </div>

        {/* 설명 */}
        {description && (
          <div
            style={{
              fontSize: "0.85rem",
              color: "#6c757d",
              textAlign: "center",
            }}
          >
            {description}
          </div>
        )}
      </div>
    </BusinessBox>
  );
};
