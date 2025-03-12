import { ActionBar, ActionButton } from "./styles";

interface BulkActionBarProps {
  isAnyChecked: boolean;
  onSelectAll: () => void;
  onDelete: () => void;
  onPin: () => void; // ✅ 변경: 매개변수 없이 실행
}

export const NoticesBulkActionBar = ({
  isAnyChecked,
  onSelectAll,
  onDelete,
  onPin,
}: BulkActionBarProps) => {
  return (
    <ActionBar>
      <ActionButton onClick={onSelectAll}>전체선택</ActionButton>
      <ActionButton onClick={onDelete} disabled={!isAnyChecked}>
        삭제
      </ActionButton>
      <ActionButton onClick={onPin} disabled={!isAnyChecked}>
        고정/해제
      </ActionButton>
    </ActionBar>
  );
};
