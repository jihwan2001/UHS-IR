import { Pagination } from "../pagination/Pagination";
import axios from "axios"; // ✅ Axios 사용
import { TableContainer, Header, Column, Row, Notice } from "../report/styles";
import { useBoardData } from "./hooks/useBoardData";
import { BoardDataProps } from "./types";
import { useEffect, useState } from "react";

interface BtnClickProps {
  setContentsClick: (value: boolean) => void;
  setSelectedReport: (report: BoardDataProps) => void;
  sortType: string; // 🔹 정렬 방식 추가
  searchKeyword: string;
}

export const AnnouncementTable = ({ setContentsClick, setSelectedReport, sortType, searchKeyword }: BtnClickProps) => {
  const [datas, setDatas] = useState<BoardDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let apiUrl = `http://localhost:8080/api/board/list?pageNum=${pageNumber}&pageSize=10&sortType=${sortType}`;
  
    if (searchKeyword.trim()) {
      apiUrl = `http://localhost:8080/api/board/search?keyword=${encodeURIComponent(searchKeyword)}`;
    }
  
    axios.get(apiUrl, { headers: { "Accept": "application/json" } })
  .then((res) => {
    console.log("📌 API 응답 데이터:", res.data);

    if (!res.data) {
      throw new Error("잘못된 응답 형식");
    }

    if (Array.isArray(res.data)) {
      setDatas(res.data);
      setTotalPages(1); // ✅ 응답이 배열일 경우 기본값 1 설정
    } else {
      setDatas(res.data.content || []);
      setTotalPages(res.data.totalPages ?? 1); // ✅ totalPages가 존재하는 경우만 설정
    }

    setLoading(false);
  })
  .catch((err) => {
    console.error("📌 공지사항 불러오기 실패:", err);
    setError("공지사항을 불러오는 중 오류 발생");
    setLoading(false);
  });

  }, [sortType, searchKeyword, pageNumber]); // ✅ `searchKeyword`가 변경될 때 다시 실행
  
  
  if (loading) return <p>📡 데이터를 불러오는 중...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <TableContainer>
      <Header>
        <Column flexValue={1}>번호</Column>
        <Column textPosition="left" flexValue={5}>제목</Column>
        <Column flexValue={1}>작성자</Column>
        <Column flexValue={1}>작성일</Column>
      </Header>
      {datas
        .sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || b.boardId - a.boardId) 
        .map((report) => (
          <Row
            key={report.boardId}
            onClick={() => {
              setSelectedReport(report);
              setContentsClick(true);
            }}
          >
            <Column flexValue={1}>
              {report.isPinned ? <Notice>공지</Notice> : report.boardId}
            </Column>
            <Column textPosition="left" flexValue={5}>{report.boardTitle}</Column>
            <Column flexValue={1}>{report.userName}</Column>
            <Column flexValue={1}>{report.boardDate}</Column>
          </Row>
        ))}
      
      {/* 페이지네이션 추가 */}
      {totalPages > 1 && (
        <Pagination
          pageNumber={Math.max(1, pageNumber)} // 🔹 최소 1 이상 유지
          totalPages={totalPages}
          setPageNumber={(newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
              setPageNumber(newPage);
            }
          }}
        />
      )}
    </TableContainer>
  );
};  