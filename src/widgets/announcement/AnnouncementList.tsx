import { useState, useEffect } from "react";
import { SearchBar, AnnouncementTable } from "../../features";
import { Container, FilterContainer, Header } from "../reportList/styles";
import { AnnouncementContent } from "./AnnouncementContent";
import { BoardDataProps } from "../../features/announcement/types";
import { SortDropdown } from "../../shared";

export const AnnouncementList = () => {
  const [contentsClick, setContentsClick] = useState(false);
  const [selectedReport, setSelectedReport] = useState<BoardDataProps | null>(
    null
  );
  const [sortType, setSortType] = useState("latest"); // 🔹 정렬 방식 상태 추가
  const [searchKeyword, setSearchKeyword] = useState(localStorage.getItem("searchTerm") || "");
  const [pageNumber, setPageNumber] = useState(1); // ✅ 페이지 상태 추가
  
  const handleSearch = (query: string) => {
    console.log("🔍 검색 실행:", query);
  
    if (!query.trim()) {
      localStorage.removeItem("searchTerm");
      setSearchKeyword(""); // ✅ 검색어 초기화
      setPageNumber(1); // ✅ 페이지 번호 초기화
    } else {
      localStorage.setItem("searchTerm", query);
      setSearchKeyword(query);
    }
  };
  

  useEffect(() => {
    if (!searchKeyword.trim()) {
      setSearchKeyword(""); // ✅ 검색어가 없으면 초기화
    }
  }, [searchKeyword]);

  //공지사항 클릭시 보이는 페이지
  return (
    <Container>
      <Header>공지사항</Header>
      {!contentsClick && (
        <>
          <FilterContainer>
            <SearchBar onSearch={handleSearch} />
            <SortDropdown
              sortOptions={["최신순", "오래된 순", "고정된 것만"]} // ✅ Notices와 동일한 정렬 옵션 사용
              onSortChange={(index) => setSortType(["latest", "oldest", "pinned"][index])}
            />
          </FilterContainer>
          <AnnouncementTable
            setContentsClick={setContentsClick}
            setSelectedReport={setSelectedReport}
            sortType={sortType}
            searchKeyword={searchKeyword}
          />
        </>
      )}
      {contentsClick && selectedReport && (
        <AnnouncementContent
          setContentsClick={setContentsClick}
          report={selectedReport}
        />
      )}
    </Container>
  );
}