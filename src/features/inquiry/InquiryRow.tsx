import { StyledTd, TitleTd } from "../notices/styles";

interface NoticesRowProps {
  onRowClick: () => void; // ✅ 클릭 이벤트 추가
}

export const InquiryRow = ({ onRowClick }: NoticesRowProps) => {
  return (
    <tr onClick={onRowClick}>
      {" "}
      {/* ✅ 행을 클릭하면 실행 */}
      <StyledTd>1</StyledTd>
      <TitleTd>asdasda</TitleTd>
      <StyledTd>홍길동</StyledTd>
      <StyledTd>학생</StyledTd>
      <StyledTd>2025-02-23</StyledTd>
      <StyledTd>처리됨</StyledTd>
      <StyledTd>홍길동</StyledTd>
      <StyledTd>2025-02-23</StyledTd>
    </tr>
  );
};
