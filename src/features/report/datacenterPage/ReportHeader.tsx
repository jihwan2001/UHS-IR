import { StyledTh } from "../../notices/styles";

const columnWidths = {
  checkbox: "5%",
  reportId: "10%",
  reportName: "45%",
  reportYear: "10%",
  reportMonth: "10%",
  reportDate: "20%",
};

export const ReportHeader = () => {
  return (
    <thead>
      <tr>
        <StyledTh style={{ width: columnWidths.checkbox }}>구분</StyledTh>
        <StyledTh style={{ width: columnWidths.reportId }}>보고서 ID</StyledTh>
        <StyledTh style={{ width: columnWidths.reportName }}>
          보고서 이름
        </StyledTh>
        <StyledTh style={{ width: columnWidths.reportYear }}>년도</StyledTh>
        <StyledTh style={{ width: columnWidths.reportMonth }}>월</StyledTh>
        <StyledTh style={{ width: columnWidths.reportDate }}>작성일</StyledTh>
      </tr>
    </thead>
  );
};
