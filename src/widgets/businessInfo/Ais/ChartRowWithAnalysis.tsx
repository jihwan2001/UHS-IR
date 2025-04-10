import { BusinessChartBox, CustomDot, CustomDotRed } from "../../../entities";
import { DonutChartBox } from "../../../entities/businessInfo/DonutChartBox ";
import { useChartAnalysis } from "../hooks/useChartAnalysis";
import { ChartRow, Description } from "./style";

interface Props {
  chartKey: string;
  dataArr: { year: string; value: number; unit?: string }[];
  color: string;
}

export const ChartRowWithAnalysis = ({ chartKey, dataArr, color }: Props) => {
  const unit = dataArr[0]?.unit;
  const { analysis, loading, error } = useChartAnalysis(chartKey);

  const description = loading ? (
    <p>분석 불러오는 중...</p>
  ) : error ? (
    <p>분석 실패</p>
  ) : (
    <>
      <p>
        <strong>전체 상태</strong>: {analysis?.status || "-"}
      </p>
      <p>
        <strong>자료 해석</strong>: {analysis?.trend || "-"}
      </p>
      <p>
        <strong>보완 방안</strong>: {analysis?.suggestion || "-"}
      </p>
      <p>
        <strong>상태 등급</strong>: {analysis?.statusgrade || "-"}
      </p>
    </>
  );

  if (
    chartKey === "전임교원 확보율" ||
    chartKey === "2022년도 학생 만족도 조사" ||
    chartKey === "등록금 대비 교육비"
  ) {
    const percent = dataArr[0]?.value ?? 0;
    return (
      <ChartRow>
        <DonutChartBox
          title={chartKey}
          percent={percent}
          color={color}
          description={unit}
        />
        <Description>{description}</Description>
      </ChartRow>
    );
  }

  return (
    <ChartRow>
      <BusinessChartBox
        title={chartKey}
        unit={unit}
        data={dataArr}
        stroke={color}
        fill={color}
        dot={color === "#28a745" ? CustomDot : CustomDotRed}
      />
      <Description>{description}</Description>
    </ChartRow>
  );
};
