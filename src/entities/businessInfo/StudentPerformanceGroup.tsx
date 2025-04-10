import {
  BusinessChartBox,
  CustomDot,
  CustomDotRed,
  GroupNameBox,
} from "../../entities";
import { useChartData } from "../../widgets/businessInfo/hooks/useChartData";
import { groupByChartKey } from "../../widgets/businessInfo/hooks/groupByChartKey";
import { DonutChartBox } from "./DonutChartBox ";

export const StudentPerformanceGroup = () => {
  const { chartData, loading, error } = useChartData(["학생 성과 그룹"]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const data = chartData["학생 성과 그룹"];

  const colorMap: Record<string, string> = {
    취업률: "#dc3545",
    중도탈락률: "#dc3545",
    진학률: "#28a745",
    "기숙사 수용률": "#0F2280",
  };

  const grouped = groupByChartKey(data);

  return (
    <>
      <GroupNameBox>학생 성과 그룹</GroupNameBox>
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(grouped).map(([chartKey, dataArr]) => {
          const color = colorMap[chartKey] || "#28a745";
          const unit = dataArr[0]?.unit; // ✅ 여기서 공통으로 선언

          if (chartKey === "2022년도 학생 만족도 조사") {
            const percent = dataArr[0]?.value ?? 0;

            return (
              <DonutChartBox
                key={chartKey}
                title={chartKey}
                percent={percent}
                color="#0F2280"
                description="만족률"
              />
            );
          }

          return (
            <BusinessChartBox
              key={chartKey}
              unit={unit} // ✅ 정상 작동
              title={chartKey}
              data={dataArr}
              stroke={color}
              fill={color}
              dot={color === "#28a745" ? CustomDot : CustomDotRed}
            />
          );
        })}
      </div>
    </>
  );
};
