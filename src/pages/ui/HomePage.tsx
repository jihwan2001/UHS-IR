import { Banner, QuickLinks, Statistics } from "../../widgets";
import { Container, Contents } from "../styles";

// 메인홈피
export const HomePage = () => {
  return (
    <Container isFixedHeight={true}>
      <Banner />
      <Contents>
        <QuickLinks />
        <Statistics />
      </Contents>
    </Container>
  );
};
