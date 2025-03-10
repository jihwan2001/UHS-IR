import { StyledTh } from "../notices/styles";

const columnWidths = {
  number: "5%",
  title: "20%",
  inquirer: "12%",
  category: "12%",
  date: "12%",
  status: "12%",
  handler: "12%",
  processDate: "12%",
};

export const InquiryHeader = () => {
  return (
    <thead>
      <tr>
        <StyledTh style={{ width: columnWidths.number }}>번호</StyledTh>
        <StyledTh style={{ width: columnWidths.title, textAlign: "left" }}>
          제목
        </StyledTh>
        <StyledTh style={{ width: columnWidths.inquirer }}>문의자</StyledTh>
        <StyledTh style={{ width: columnWidths.category }}>
          문의자 구분
        </StyledTh>
        <StyledTh style={{ width: columnWidths.date }}>작성일</StyledTh>
        <StyledTh style={{ width: columnWidths.status }}>처리 상태</StyledTh>
        <StyledTh style={{ width: columnWidths.handler }}>처리자</StyledTh>
        <StyledTh style={{ width: columnWidths.processDate }}>처리일</StyledTh>
      </tr>
    </thead>
  );
};
