import { useEffect, useState } from "react";
import { StyledTd, StyledCheckbox, TitleTd } from "./styles";
import { NoticeItem } from "./model";

interface NoticesRowProps {
  item: NoticeItem;
  isChecked: boolean;
  onCheckboxChange: () => void;
  onRowClick: () => void;
}

export const NoticesRow = ({
  item,
  isChecked,
  onCheckboxChange,
  onRowClick,
}: NoticesRowProps) => {
  const [isPinned, setIsPinned] = useState(item.isPinned);

  useEffect(() => {
    setIsPinned(item.isPinned); // ✅ isPinned 값이 변경될 때마다 업데이트
    console.log("pinned 값 : ", isPinned);
  }, [item.isPinned]);

  return (
    <tr onClick={onRowClick}>
      <StyledTd>
        <StyledCheckbox
          type="checkbox"
          checked={isChecked}
          onChange={onCheckboxChange}
          onClick={(e) => e.stopPropagation()} // ✅ 체크박스 클릭 시 row 클릭 방지
        />
      </StyledTd>
      <StyledTd>{item.boardId}</StyledTd>
      <StyledTd>{isPinned ? "O" : "X"}</StyledTd> {/* ✅ useState로 반영 */}
      <TitleTd>{item.boardTitle}</TitleTd>
      <StyledTd>{item.userName}</StyledTd>
      <StyledTd>{item.boardDate}</StyledTd>
      <StyledTd>{item.viewCount.toLocaleString()}</StyledTd>
    </tr>
  );
};
