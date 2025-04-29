import { TableContainer, Header, Column, Row } from "./styles";
import { handleRowClick } from "./hooks/handleRowClick";
import { useReportDatas } from "./hooks/handleReportDatas";

// 날짜 포맷: yyyy.mm.dd
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export const ReportTable = ({ reportGroup }: { reportGroup: string }) => {
  const { reports, loading } = useReportDatas(reportGroup);

  if (loading) {
    return <div>로딩 중...</div>;
  }

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
    </TableContainer>
  );
};
