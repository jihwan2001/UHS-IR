import {
  YearSelector,
  SearchBar,
  ReportTable,
  Pagination,
} from "../../features";
import { Container, Header, FilterContainer } from "./styles";

export const ReportList = () => {
  return (
    <Container>
      <Header>분석 보고서</Header>
      <FilterContainer>
        <YearSelector />
        <SearchBar />
      </FilterContainer>
      <ReportTable />
      {/* <Pagination /> */}
    </Container>
  );
};
