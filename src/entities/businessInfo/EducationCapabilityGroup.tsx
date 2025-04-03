import {
  BusinessChartBox,
  CustomDot,
  CustomDotRed,
  GroupNameBox,
} from "../../entities";
import { useChartData } from "../../widgets/businessInfo/hooks/BusinessInfoChartHooks";
import { groupByChartKey } from "../../widgets/businessInfo/hooks/groupByChartKey";
import { DonutChartBox } from "./DonutChartBox ";

export const EducationCapabilityGroup = () => {
  const { chartData, loading, error } = useChartData(["교육 역량 그룹"]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const data = chartData["교육 역량 그룹"];

  const colorMap: Record<string, string> = {
    "전임교원 1인당 학생 수": "#dc3545",
    "전임교원 1인당 연구 실적": "#28a745",
    "전임교원 강의 담당 비율": "#28a745",
    "전임교원 확보율": "#0F2280", // 도넛 전용 색상
  };

  const grouped = groupByChartKey(data);

  return (
    <>
      <GroupNameBox>교육 역량 그룹</GroupNameBox>
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

          // 🎯 전임교원 확보율 → 도넛 차트로 렌더링
          if (chartKey === "전임교원 확보율") {
            const percent = dataArr[0]?.value ?? 0;
            return (
              <DonutChartBox
                key={chartKey}
                title={chartKey}
                percent={percent}
                color={color}
                description="확보율"
              />
            );
          }

          return (
            <BusinessChartBox
              key={chartKey}
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
