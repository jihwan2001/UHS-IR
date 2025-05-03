import { useEffect } from "react";
import { TableContainer, Header, Column, Row } from "../styles";
import { Pagination } from "../../pagination/Pagination";
import { handleRowClick } from "../hooks/handleRowClick";
import { ReportItems } from "../types";

// 날짜 포맷: yyyy.mm.dd
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

interface ReportTableProps {
  reports: ReportItems[];
  loading: boolean;
  error: string;
  totalPages: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
}

export const ReportTable = ({
  reports,
  loading,
  error,
  totalPages,
  pageNumber,
  setPageNumber,
}: ReportTableProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber]);

  if (loading) return <div>로딩 중...</div>;
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
          setPageNumber={setPageNumber}
        />
      )}
    </TableContainer>
  );
};
