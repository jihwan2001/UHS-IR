import { InquiryTotal, SmallBanner } from "../../widgets";
import { Container, Contents } from "../styles";

// 문의 페이지
export const Inquiry = () => {
  return (
    <Container isFixedHeight={true}>
      <SmallBanner />
      <Contents>
        <InquiryTotal />
      </Contents>
    </Container>
  );
};
