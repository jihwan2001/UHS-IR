import styled from "styled-components";
import { BusinessChartBox, CustomDot, CustomDotRed } from "../../../entities";
import { DonutChartBox } from "../../../entities/businessInfo/DonutChartBox ";
import { useChartAnalysis } from "../hooks/useChartAnalysis";

const ChartRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
`;

const Description = styled.div`
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;
`;

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

  if (chartKey === "전임교원 확보율") {
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
