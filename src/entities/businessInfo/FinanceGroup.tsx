import {
  BusinessChartBox,
  CustomDot,
  CustomDotRed,
  GroupNameBox,
} from "../../entities";
import { useChartData } from "../../widgets/businessInfo/hooks/useChartData";
import { groupByChartKey } from "../../widgets/businessInfo/hooks/groupByChartKey";
import { DonutChartBox } from "./DonutChartBox ";

export const FinanceGroup = () => {
  const { chartData, loading, error } = useChartData(["재정 상태 그룹"]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const data = chartData["재정 상태 그룹"];

  const colorMap: Record<string, string> = {
    "학생 1인당 교육비": "#28a745", // 초록
    "등록금 수입": "#dc3545", // 빨강
    "장학금 수혜": "#dc3545", // 빨강
    "등록금 대비 교육비": "#0F2280", // 파랑 (도넛 전용)
  };

  return (
    <>
      <GroupNameBox>재정 상태 그룹</GroupNameBox>
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(groupByChartKey(data)).map(([chartKey, dataArr]) => {
          const color = colorMap[chartKey] || "#28a745";
          const unit = dataArr[0]?.unit;

          // 🎯 도넛 차트 분기
          if (chartKey === "등록금 대비 교육비") {
            const percent = dataArr[dataArr.length - 1]?.value ?? 0;
            return (
              <DonutChartBox
                key={chartKey}
                title={chartKey}
                percent={percent}
                color={color}
                description="비율"
              />
            );
          }

          return (
            <BusinessChartBox
              key={chartKey}
              unit={unit}
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
