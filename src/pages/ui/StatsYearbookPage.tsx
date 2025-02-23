import { StatsContents, StatsYearName } from "../../features";
import { SmallBanner } from "../../widgets";
import { Container, Contents } from "../styles";

// 대학 통계연보 페이지
export const StatsYearbookPage = () => {
  return (
    <Container>
      <SmallBanner />
      <Contents>
        <StatsYearName />
        <StatsContents />
      </Contents>
    </Container>
  );
};
