import { useEffect, useState } from "react"; // 이미 있음
import { TableContainer, Header, Column, Row } from "./styles";
import { Pagination } from "../pagination/Pagination";
import { handleRowClick } from "./hooks/handleRowClick";
import { useReportDatas } from "./hooks/handleReportDatas";

// 날짜 포맷: yyyy.mm.dd
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export const ReportTable = ({ reportGroup }: { reportGroup: string }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { reports, loading, error, totalPages } = useReportDatas(
    reportGroup,
    pageNumber
  );

  // ✅ 페이지 번호가 바뀔 때 스크롤 맨 위로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 스크롤 올라감
  }, [pageNumber]);

  if (loading) {
    return <div>로딩 중...</div>;
  }
  if (error) return <p>❌ {error}</p>;

  return (
    <TableContainer>
      <Header>
        <Column flexValue={1}>번호</Column>
        <Column flexValue={5}>제목</Column>
        <Column flexValue={1}>작성일</Column>
      </Header>

      {reports.length > 0 ? (
        reports.map((report) => (
          <Row
            key={report.reportId}
            onClick={() => handleRowClick(report.reportId)}
          >
            <Column flexValue={1}>{report.reportId}</Column>
            <Column flexValue={5}>{report.reportName}</Column>
            <Column flexValue={1}>{formatDate(report.reportDate)}</Column>
          </Row>
        ))
      ) : (
        <div>데이터가 없습니다.</div>
      )}

      {totalPages > 1 && (
        <Pagination
          pageNumber={pageNumber}
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
