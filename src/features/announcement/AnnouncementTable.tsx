import { Pagination } from "../pagination/Pagination";
import { TableContainer, Header, Column, Row, Notice } from "../report/styles";
import { useBoardData } from "./hooks/useBoardData";
import { BoardDataProps } from "./types";

interface BtnClickProps {
  setContentsClick: (value: boolean) => void;
  setSelectedReport: (report: BoardDataProps) => void;
}

export const AnnouncementTable = ({
  setContentsClick,
  setSelectedReport,
}: BtnClickProps) => {
  const { datas, loading, error, pageNumber, setPageNumber, totalPages } =
    useBoardData(1);

  if (loading) return <p>📡 데이터를 불러오는 중...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <TableContainer>
      <Header>
        <Column flexValue={1}>번호</Column>
        <Column textPosition="left" flexValue={5}>
          제목
        </Column>
        <Column flexValue={1}>작성자</Column>
        <Column flexValue={1}>작성일</Column>
      </Header>
      {datas.map((report) => (
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
          <Column textPosition="left" flexValue={5}>
            {report.boardTitle}
          </Column>
          <Column flexValue={1}>{report.userName}</Column>
          <Column flexValue={1}>{report.boardDate}</Column>
        </Row>
      ))}
      {/* 페이지네이션 버튼 추가 가능 */}
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </TableContainer>
  );
};
