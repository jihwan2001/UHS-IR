import { GroupNameBox } from "../../../entities";
import { useChartData } from "../hooks/useChartData";
import { groupByChartKey } from "../hooks/groupByChartKey";
import { ChartRowWithAnalysis } from "./ChartRowWithAnalysis";

export const EduCompetency = () => {
  const { chartData, loading, error } = useChartData(["교육 역량 그룹"]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const data = chartData["교육 역량 그룹"];
  const grouped = groupByChartKey(data);

  const colorMap: Record<string, string> = {
    "전임교원 1인당 학생 수": "#dc3545",
    "전임교원 1인당 연구 실적": "#28a745",
    "전임교원 강의 담당 비율": "#28a745",
    "전임교원 확보율": "#0F2280", // 도넛 전용 색
  };

  const analysis: Record<
    string,
    {
      summary: string;
      interpretation: string;
      suggestion: string;
    }
  > = {
    "전임교원 1인당 학생 수": {
      summary: "2021~2023년 증가",
      interpretation: "교원 수 대비 학생 수 증가",
      suggestion: "교원 확보 필요",
    },
    "전임교원 확보율": {
      summary: "목표에 근접",
      interpretation: "교원 확보가 일정 수준 충족됨",
      suggestion: "유지 및 질적 향상 필요",
    },
  };

  return (
    <>
      <GroupNameBox>교육 역량 그룹</GroupNameBox>
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
