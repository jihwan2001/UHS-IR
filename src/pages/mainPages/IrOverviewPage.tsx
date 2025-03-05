import { IrOverviewContents } from "../../features";
import { SmallBanner } from "../../widgets";
import { Container, Contents } from "../styles";

// ir 소개페이지
export const IrOverviewPage = () => {
  return (
    <Container>
      <SmallBanner />
      <Contents>
        <IrOverviewContents />
      </Contents>
    </Container>
  );
};
