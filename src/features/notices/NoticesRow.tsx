import { StyledTd, StyledCheckbox, TitleTd } from "./styles";

interface NoticeItem {
  id: number;
  number: string;
  fixed: string;
  title: string;
  author: string;
  date: string;
  views: string;
}
interface NoticesRowProps {
  item: NoticeItem;
  isChecked: boolean;
  onCheckboxChange: () => void;
  onRowClick: () => void; // 클릭 시 실행할 함수 추가
}

export const NoticesRow = ({
  item,
  isChecked,
  onCheckboxChange,
  onRowClick,
}: NoticesRowProps) => {
  return (
    <tr>
      {/* 체크박스 셀 (클릭 이벤트 없음) */}
      <StyledTd>
        <StyledCheckbox
          type="checkbox"
          checked={isChecked}
          onChange={onCheckboxChange}
        />
      </StyledTd>

      {/* 나머지 셀은 클릭 가능 */}
      <StyledTd onClick={onRowClick}>{item.number}</StyledTd>
      <StyledTd onClick={onRowClick}>{item.fixed}</StyledTd>
      <TitleTd onClick={onRowClick}>{item.title}</TitleTd>
      <StyledTd onClick={onRowClick}>{item.author}</StyledTd>
      <StyledTd onClick={onRowClick}>{item.date}</StyledTd>
      <StyledTd onClick={onRowClick}>{item.views}</StyledTd>
    </tr>
  );
};
