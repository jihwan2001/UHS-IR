// InquiryMain.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar, InquiryBulkActionBar } from "../../features";
import { InquiryTable } from "../../features/inquiry/InquiryTable";
import { Line, SortDropdown } from "../../shared";
import { Header, HeaderLeft, HeaderRight } from "./styles";

export const InquiryMain = () => {
  const [complains, setComplains] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    sessionStorage.getItem("searchTerm") || ""
  );
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("latest");

  // ✅ 전체 조회 및 검색용 공통 함수
  const fetchNotices = async () => {
    try {
      const response = await axios.get("/api/complain/search", {
        params: {
          keyword: searchTerm,
          page,
          size: 10,
          sort: sortType, // ✅ 변경된 파라미터명
        },
      });
      setComplains(response.data);
    } catch (error) {
      console.error("불러오기 오류:", error);
    }
  };

  // ✅ 검색 핸들러
  const handleSearch = async (searchKeyword: string) => {
    sessionStorage.setItem("searchTerm", searchKeyword);
    setSearchTerm(searchKeyword);
    setPage(1); // 검색 시 페이지 초기화
  };

  // ✅ 상태 필터 핸들러
  const handleFilterChange = async (state: string) => {
    try {
      let response;
      if (state === "전체보기") {
        response = await axios.get("/api/complain/search", {
          params: { keyword: "", page: 1, size: 10, sort: sortType }, // ✅ 정렬 포함
        });
      } else {
        response = await axios.get("/api/complain/state", {
          params: { value: state, page: 1, size: 10, sort: sortType }, // ✅ 정렬 포함
        });
      }
      setComplains(response.data);
    } catch (error) {
      console.error("상태 필터 오류:", error);
    }
  };

  // ✅ 검색어, 페이지, 정렬이 바뀔 때마다 목록 재조회
  useEffect(() => {
    sessionStorage.removeItem("searchTerm"); // 새로고침 시 검색어 제거
    fetchNotices();
  }, [searchTerm, page, sortType]);

  return (
    <>
      <Header>
        <HeaderLeft>
          <InquiryBulkActionBar onFilterChange={handleFilterChange} />
          <Line heightSize={22} />
          <SortDropdown
            sortOptions={["최신 순", "오래된 순"]}
            onSortChange={(index) =>
              setSortType(index === 0 ? "latest" : "oldest")
            }
          />
        </HeaderLeft>
        <HeaderRight>
          <SearchBar onSearch={handleSearch} />
        </HeaderRight>
      </Header>
      <InquiryTable data={complains} />
    </>
  );
};
