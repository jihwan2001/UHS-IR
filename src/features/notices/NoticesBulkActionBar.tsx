import { ActionBar, ActionButton } from "./styles";

interface BulkActionBarProps {
  isAnyChecked: boolean;
  onSelectAll: () => void;
  onDelete: () => void;
  onPin: (isPinned: boolean) => void; // ✅ true → 고정, false → 해제
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
      <ActionButton onClick={() => onPin(true)} disabled={!isAnyChecked}>
        고정
      </ActionButton>
      <ActionButton onClick={() => onPin(false)} disabled={!isAnyChecked}>
        해제
      </ActionButton>
    </ActionBar>
  );
};
