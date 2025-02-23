import { TableContainer, Header, Column, Row } from "./styles";

const sampleReports = [
  { id: 124, title: "2024학년도 종합 보고서", date: "2025.01.30" },
  {
    id: 123,
    title: "2024학년도 4분기 보고서",
    date: "2024.12.28",
  },
  { id: 122, title: "2024학년도 3분기", date: "2024.09.26" },
  { id: 121, title: "2024학년도 2분기", date: "2024.06.25" },
];

export const ReportTable = () => {
  return (
    <TableContainer>
      <Header>
        <Column flexValue={1}>번호</Column>
        <Column flexValue={5}>제목</Column>
        <Column flexValue={1}>작성일</Column>
      </Header>
      {sampleReports.map((report) => (
        <Row key={report.id}>
          <Column flexValue={1}>{report.id}</Column>
          <Column flexValue={5}>{report.title}</Column>
          <Column flexValue={1}>{report.date}</Column>
        </Row>
      ))}
    </TableContainer>
  );
};
