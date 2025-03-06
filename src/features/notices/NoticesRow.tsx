import { StyledTd, StyledCheckbox, TitleTd } from "./styles";
import { NoticeItem } from "./model";

interface NoticesRowProps {
  item: NoticeItem;
  isChecked: boolean;
  onCheckboxChange: () => void;
  onRowClick: () => void; // ✅ 클릭 이벤트 추가
}

export const NoticesRow = ({
  item,
  isChecked,
  onCheckboxChange,
  onRowClick,
}: NoticesRowProps) => {
  return (
    <tr onClick={onRowClick}>
      {" "}
      {/* ✅ 행을 클릭하면 실행 */}
      <StyledTd>
        <StyledCheckbox
          type="checkbox"
          checked={isChecked}
          onChange={onCheckboxChange}
          onClick={(e) => e.stopPropagation()} // ✅ 체크박스 클릭 시 row 클릭 방지
        />
      </StyledTd>
      <StyledTd>{item.id}</StyledTd>
      <StyledTd>{item.isPinned ? "O" : "X"}</StyledTd>
      <TitleTd>{item.boardTitle}</TitleTd>
      <StyledTd>{`User ${item.user}`}</StyledTd>
      <StyledTd>{item.boardDate}</StyledTd>
      <StyledTd>{item.viewCount.toLocaleString()}</StyledTd>
    </tr>
  );
};
