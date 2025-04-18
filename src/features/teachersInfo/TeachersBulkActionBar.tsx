import { ActionBar, ActionButton } from "../notices/styles";

interface BulkActionBarProps {
  isAllChecked: boolean;
  isAnyChecked: boolean;
  onSelectAll: () => void;
  onDelete: () => void;
}

export const TeachersBulkActionBar = ({
  isAllChecked,
  isAnyChecked,
  onSelectAll,
  onDelete,
}: BulkActionBarProps) => {
  return (
    <ActionBar>
      <ActionButton onClick={onSelectAll}>
        {isAllChecked ? "전체해제" : "전체선택"}
      </ActionButton>
      <ActionButton onClick={onDelete} disabled={!isAnyChecked}>
        삭제{" "}
      </ActionButton>
    </ActionBar>
  );
};
