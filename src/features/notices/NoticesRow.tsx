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
  return (
    <tr>
      <StyledTd>
        <StyledCheckbox
          type="checkbox"
          checked={isChecked}
          onChange={onCheckboxChange}
        />
      </StyledTd>
      <StyledTd onClick={onRowClick}>{item.id}</StyledTd> {/* ID 사용 */}
      <StyledTd onClick={onRowClick}>{item.isPinned ? "O" : "X"}</StyledTd>{" "}
      {/* 고정 여부 */}
      <TitleTd onClick={onRowClick}>{item.boardTitle}</TitleTd> {/* 제목 */}
      <StyledTd onClick={onRowClick}>{`User ${item.user}`}</StyledTd>{" "}
      {/* 작성자 */}
      <StyledTd onClick={onRowClick}>{item.boardDate}</StyledTd> {/* 날짜 */}
      <StyledTd onClick={onRowClick}>
        {item.viewCount.toLocaleString()}
      </StyledTd>{" "}
      {/* 조회수 */}
    </tr>
  );
};
