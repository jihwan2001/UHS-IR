import { useState } from "react";
import { YearSelector, SearchBar, ReportTable } from "../../features";
import { Container, Header, FilterContainer } from "./styles";

export const ReportList = () => {
  const [reportGroup] = useState<string>(""); // 초기값

  return (
    <Container>
      <Header>분석 보고서</Header>
      <FilterContainer>
        <YearSelector />
        <SearchBar />
      </FilterContainer>
      <ReportTable reportGroup={reportGroup} />
    </Container>
  );
};
