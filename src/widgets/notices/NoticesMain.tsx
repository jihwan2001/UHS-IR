import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";

import {
  NoticesBulkActionBar,
  NoticesAddBtn,
  NoticesTable,
  SearchBar,
} from "../../features";
import { Line, SortDropdown } from "../../shared";
import { Header, HeaderLeft, HeaderRight, NoticeContainer } from "./styles";
import { useNoticesDelete } from "./hooks/NoticesDeleteHooks";
import { useNoticePin } from "./hooks/NoticesPinHooks";

export const NoticesMain = () => {
  const { selectedNotices, setSelectedNotices, handleDelete } =
    useNoticesDelete();
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    sessionStorage.getItem("searchTerm") || ""
  ); // ✅ 새로고침 시 검색어 유지
  const [sortType, setSortType] = useState("latest");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      let response;
      if (!searchTerm.trim()) {
        response = await axios.get(`http://localhost:8080/api/board/list`, {
          params: { page, size: pageSize, sortType },
          withCredentials: true, // ✅ 세션 유지 추가
        });
      } else {
        response = await axios.get(`http://localhost:8080/api/board/search`, {
          params: { keyword: searchTerm, page, size: pageSize, sortType },
          withCredentials: true, // ✅ 검색 요청에도 세션 유지 추가
        });
      }

      console.log("📌 API 응답 데이터:", response.data);
      setNotices(response.data?.content || response.data || []);
    } catch (error) {
      console.error("📌 공지사항 목록 불러오기 오류:", error);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };
  const { handlePinToggle } = useNoticePin(fetchNotices);

  // 🔹 검색 실행 함수
  const handleSearch = (query: string) => {
    console.log("🔍 검색 실행:", query);

    if (!query.trim()) {
      sessionStorage.removeItem("searchTerm"); 
      setSearchTerm("");
      setPage(1);
      fetchNotices();
    } else {
      sessionStorage.setItem("searchTerm", query);
      setSearchTerm(query);
    }

    setPage(1);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchNotices(); // ✅ 검색어가 없을 경우 자동으로 전체 리스트 호출
    }
  }, [searchTerm]);

  // 🔹 페이지 로드 시 & 검색어, 정렬 변경 시 API 호출
  useEffect(() => {
    sessionStorage.removeItem("searchTerm");
    fetchNotices();
  }, [searchTerm, page, sortType]);

  return (
    <NoticeContainer>
      <Header>
        <HeaderLeft>
          <NoticesAddBtn />
          <Line heightSize={22} />
          <NoticesBulkActionBar
            isAnyChecked={selectedNotices.length > 0}
            onSelectAll={() => {}}
            onDelete={handleDelete}
            onPin={() => handlePinToggle(selectedNotices)}
          />
          <Line heightSize={22} />
          <SortDropdown
            sortOptions={["최신 순", "오래된 순", "고정된 것만"]}
            onSortChange={(index) =>
              setSortType(["latest", "oldest", "pinned"][index])
            }
          />
        </HeaderLeft>
        <HeaderRight>
          <SearchBar onSearch={handleSearch} />
        </HeaderRight>
      </Header>

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
      ) : (
        <NoticesTable
          notices={notices}
          isAllChecked={false}
          setIsAnyChecked={() => {}}
          setSelectedNotices={setSelectedNotices}
        />
      )}
    </NoticeContainer>
  );
};
