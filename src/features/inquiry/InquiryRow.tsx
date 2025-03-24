import { StyledTd, TitleTd } from "../notices/styles";
import { ComplainItem } from "./model";

interface InquiryRowProps {
  data: ComplainItem; // ✅ 데이터 바인딩을 위해 추가
  onRowClick: () => void; // ✅ 클릭 이벤트 추가
}

export const InquiryRow = ({ data, onRowClick }: InquiryRowProps) => {
  return (
    <tr onClick={onRowClick}>
      {" "}
      {/* ✅ 행을 클릭하면 실행 */}
      <StyledTd>{data.complainId}</StyledTd>
      <TitleTd>{data.complainTitle}</TitleTd>
      <StyledTd>{data.userName}</StyledTd>
      <StyledTd>{data.complainantType}</StyledTd>
      <StyledTd>{data.complainDate}</StyledTd>
      <StyledTd>{data.complainState}</StyledTd>
      <StyledTd>{data.processor ?? "-"}</StyledTd>
      {/* 처리자가 없으면 "-" 표시 */}
      <StyledTd>{data.processedDate ?? "-"}</StyledTd>
      {/* 처리일이 없으면 "-" 표시 */}
    </tr>
  );
};