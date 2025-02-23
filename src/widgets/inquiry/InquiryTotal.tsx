import { InquiryFnQ, InquiryReception } from "../../features";
import { Container, FilterContainer, Header } from "../reportList/styles";

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
