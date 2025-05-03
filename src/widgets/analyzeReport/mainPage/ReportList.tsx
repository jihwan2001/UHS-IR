import { useState, useEffect } from "react";
import { YearSelector, SearchBar, ReportTable } from "../../../features";
import { Container, Header, FilterContainer } from "../styles";
import { useReportSearchData } from "./hooks/useReportSearchData";

export const ReportList = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  // 🔁 검색 조건 바뀌면 페이지 초기화
  useEffect(() => {
    setPageNumber(1);
  }, [searchKeyword, selectedYear]);

  const { reports, loading, error, totalPages } = useReportSearchData(
    searchKeyword,
    selectedYear,
    pageNumber
  );

  return (
    <Container>
      <Header>분석 보고서</Header>
      <FilterContainer>
        <YearSelector
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
        <SearchBar onSearch={setSearchKeyword} />
      </FilterContainer>
      <ReportTable
        reports={reports}
        loading={loading}
        error={error}
        totalPages={totalPages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </Container>
  );
};
