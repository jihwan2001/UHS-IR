import { PieChart, Pie, Cell } from "recharts";

export const DonutChartBox = ({
  title,
  percent,
  color,
  description,
}: {
  title: string;
  percent: number;
  color: string;
  description?: string;
}) => {
  const data = [
    { name: "만족", value: percent },
    { name: "기타", value: 100 - percent },
  ];

  return (
    <div style={{ width: 200, textAlign: "center" }}>
      <h4>{title}</h4>
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
      <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{percent}%</div>
      {description && (
        <div style={{ fontSize: "0.85rem", color: "#6c757d" }}>
          {description}
        </div>
      )}
    </div>
  );
};
