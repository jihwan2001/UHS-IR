import { TableContainer, Header, Column, Row } from "../report/styles";
import { sampleReports, Announcement } from "../../entities/announcement/model";

interface BtnClickProps {
  setContentsClick: (value: boolean) => void;
  setSelectedReport: (report: Announcement) => void;
}

export const AnnouncementTable = ({
  setContentsClick,
  setSelectedReport,
}: BtnClickProps) => {
  return (
    <TableContainer>
      <Header>
        <Column flexValue={1}>번호</Column>
        <Column flexValue={5}>제목</Column>
        <Column flexValue={1}>작성일</Column>
      </Header>
      {sampleReports.map((report) => (
        <Row
          key={report.id}
          onClick={() => {
            setSelectedReport(report); // 클릭한 데이터를 상태로 저장
            setContentsClick(true); // 컨텐츠 페이지로 이동
          }}
        >
          <Column flexValue={1}>{report.id}</Column>
          <Column flexValue={5}>{report.title}</Column>
          <Column flexValue={1}>{report.date}</Column>
        </Row>
      ))}
    </TableContainer>
  );
};
