import { GroupNameBox } from "../../../entities";
import { useChartData } from "../hooks/useChartData";
import { groupByChartKey } from "../hooks/groupByChartKey";
import { ChartRowWithAnalysis } from "./ChartRowWithAnalysis";

export const StuPerformance = () => {
  const { chartData, loading, error } = useChartData(["학생 성과 그룹"]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const data = chartData["학생 성과 그룹"];
  const grouped = groupByChartKey(data);

  const colorMap: Record<string, string> = {
    취업률: "#dc3545",
    중도탈락률: "#dc3545",
    진학률: "#28a745",
    "기숙사 수용률": "#dc3545",
  };

  return (
    <>
      <GroupNameBox>학생 성과 그룹</GroupNameBox>
      {Object.entries(grouped).map(([chartKey, dataArr]) => {
        const color = colorMap[chartKey] || "#0F2280";
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
