import { ActionBar, ActionButton } from "./styles";

interface BulkActionBarProps {
  isAnyChecked: boolean;
  onSelectAll: () => void;
}

export const BulkActionBar = ({
  isAnyChecked,
  onSelectAll,
}: BulkActionBarProps) => {
  return (
    <ActionBar>
      <ActionButton onClick={onSelectAll}>전체선택</ActionButton>
      <ActionButton disabled={!isAnyChecked}>삭제</ActionButton>
      <ActionButton disabled={!isAnyChecked}>고정/풀기</ActionButton>
    </ActionBar>
  );
};
