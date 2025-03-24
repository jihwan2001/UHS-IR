import { SmallBanner } from "../../widgets";
import { ReportList } from "../../widgets/reportList/ReportList";
import { Container, Contents } from "../styles";

// 분석 보고서 페이지
export const AnalysisReportsPage = () => {
  return (
    <Container isFixedHeight={true}>
      <SmallBanner />
      <Contents>
        <ReportList />
      </Contents>
    </Container>
  );
};
