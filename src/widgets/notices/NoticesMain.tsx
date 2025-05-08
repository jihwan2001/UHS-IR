import { useState, useEffect, useCallback } from "react";
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
  );
  const [sortType, setSortType] = useState("latest");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // 🔁 공지사항 목록 API 호출
  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = searchTerm.trim()
        ? `http://localhost:8080/api/board/search`
        : `http://localhost:8080/api/board/list`;

      const params = searchTerm.trim()
        ? { keyword: searchTerm, page, size: pageSize, sortType }
        : { page, size: pageSize, sortType };

      const response = await axios.get(endpoint, {
        params,
        withCredentials: true,
      });

      console.log("📌 API 응답 데이터:", response.data);
      setNotices(response.data?.content || response.data || []);
    } catch (error) {
      console.error("📌 공지사항 목록 불러오기 오류:", error);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, pageSize, sortType]);

  const { handlePinToggle } = useNoticePin(fetchNotices);

  // 🔍 검색 실행
  const handleSearch = (query: string) => {
    console.log("🔍 검색 실행:", query);
    if (!query.trim()) {
      sessionStorage.removeItem("searchTerm");
      setSearchTerm("");
    } else {
      sessionStorage.setItem("searchTerm", query);
      setSearchTerm(query);
    }
    setPage(1); // 검색 시 페이지 초기화
  };

  const handleSelectAll = () => {
    const allIds = notices.map((notice: any) => notice.id); // 공지 ID 배열 추출
    setSelectedNotices(allIds);
  };

  // 🔁 검색어 변경 시 전체 리스트 자동 호출 (빈 검색어일 때만)
  useEffect(() => {
    if (!searchTerm.trim()) {
      fetchNotices();
    }
  }, [searchTerm, fetchNotices]);

  // 🔁 페이지, 정렬 방식 변경 시 API 호출
  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return (
    <NoticeContainer>
      <Header>
        <HeaderLeft>
          <NoticesAddBtn />
          <Line heightSize={22} />
          <NoticesBulkActionBar
            isAllChecked={selectedNotices.length === notices.length}
            isAnyChecked={selectedNotices.length > 0}
            onSelectAll={handleSelectAll}
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
          isAllChecked={selectedNotices.length === notices.length} // ✅ 전체선택 여부 반영
          setIsAnyChecked={(value) => {
            // ✅ 최소 하나라도 선택되었는지 감지하여 처리
            if (!value) setSelectedNotices([]);
          }}
          setSelectedNotices={setSelectedNotices}
        />
      )}
    </NoticeContainer>
  );
};
