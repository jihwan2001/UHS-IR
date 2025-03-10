import { InquiryFnQ, InquiryReception } from "../../features";
import { Container, FilterContainer, Header } from "../reportList/styles";

// 홈 페이지에 있는 거
export const InquiryTotal = () => {
  return (
    <Container>
      <Header>문의하기</Header>
      <FilterContainer>
        <InquiryReception />
        <InquiryFnQ />
      </FilterContainer>
    </Container>
  );
};
