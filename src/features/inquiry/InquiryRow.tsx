import { StyledTd, TitleTd } from "../notices/styles";
import { ComplainItem } from "./model";
import { useEffect, useState } from "react";

interface InquiryRowProps {
  data: ComplainItem; // ✅ 데이터 바인딩을 위해 추가
  onRowClick: () => void; // ✅ 클릭 이벤트 추가
}

export const InquiryRow = ({ data, onRowClick }: InquiryRowProps) => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    if (data.userPosition === 0) {
      setUserRole("학생");
    } else if (data.userPosition === 1) {
      setUserRole("교사");
    } else if (data.userPosition === 2) {
      setUserRole("관리자");
    }
  }, [data.userPosition]);
  return (
    <tr onClick={onRowClick}>
      {" "}
      {/* ✅ 행을 클릭하면 실행 */}
      <StyledTd>{data.complainId}</StyledTd>
      <TitleTd>{data.complainTitle}</TitleTd>
      <StyledTd>{data.userName}</StyledTd>
      <StyledTd>{userRole}</StyledTd>
      <StyledTd>{data.complainDate}</StyledTd>
      <StyledTd>{data.complainState}</StyledTd>
      <StyledTd>{data.handlerName ?? "-"}</StyledTd>
      {/* 처리자가 없으면 "-" 표시 */}
      <StyledTd>{data.handledDate ?? "-"}</StyledTd>
      {/* 처리일이 없으면 "-" 표시 */}
    </tr>
  );
};
