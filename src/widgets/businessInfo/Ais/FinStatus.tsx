import { GroupNameBox } from "../../../entities";
import { useChartData } from "../hooks/useChartData";
import { groupByChartKey } from "../hooks/groupByChartKey";
import { ChartRowWithAnalysis } from "./ChartRowWithAnalysis";

export const FinStatus = () => {
  const { chartData, loading, error } = useChartData(["재정 상태 그룹"]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const data = chartData["재정 상태 그룹"];
  const grouped = groupByChartKey(data);

  const colorMap: Record<string, string> = {
    "학생 1인당 교육비": "#28a745", // 초록
    "등록금 수입": "#dc3545", // 빨강
    "장학금 수혜": "#dc3545", // 빨강
    "등록금 대비 교육비": "#0F2280",
  };

  return (
    <>
      <GroupNameBox>재정 상태 그룹</GroupNameBox>
      {Object.entries(grouped).map(([chartKey, dataArr]) => {
        const color = colorMap[chartKey] || "#28a745";
        return (
          <ChartRowWithAnalysis
            key={chartKey}
            chartKey={chartKey}
            dataArr={dataArr}
            color={color}
          />
        );
      })}
    </>
  );
};
