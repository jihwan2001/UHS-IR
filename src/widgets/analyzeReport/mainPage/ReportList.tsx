import { useState, useEffect } from "react";
import { YearSelector, SearchBar, ReportTable } from "../../../features";
import { Container, Header, FilterContainer } from "../styles";
import { useDynamicReportData } from "./hooks/useDynamicReportData";

export const ReportList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [searchKeyword, selectedYear]);

  // ✅ 올바르게 훅 사용됨 (컴포넌트 본문 안에서 호출)
  const { reports, loading, error, totalPages } = useDynamicReportData(
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
