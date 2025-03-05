import { StyledTh } from "./styles";

const columnWidths = {
  checkbox: "5%",
  number: "10%",
  fixed: "7%",
  title: "40%",
  author: "13%",
  date: "15%",
  views: "10%",
};

export const NoticesHeader = () => {
  return (
    <thead>
      <tr>
        <StyledTh style={{ width: columnWidths.checkbox }}>구분</StyledTh>
        <StyledTh style={{ width: columnWidths.number }}>번호</StyledTh>
        <StyledTh style={{ width: columnWidths.fixed }}>고정</StyledTh>
        <StyledTh style={{ width: columnWidths.title, textAlign: "left" }}>
          제목
        </StyledTh>
        <StyledTh style={{ width: columnWidths.author }}>작성자</StyledTh>
        <StyledTh style={{ width: columnWidths.date }}>작성일</StyledTh>
        <StyledTh style={{ width: columnWidths.views }}>조회수</StyledTh>
      </tr>
    </thead>
  );
};
