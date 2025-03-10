import { ActionBar, ActionButton } from "../notices/styles";

export const InquiryBulkActionBar = () => {
  return (
    <>
      <ActionBar>
        <ActionButton>전체선택</ActionButton>
        <ActionButton disabled>처리됨</ActionButton>
        <ActionButton disabled>대기중</ActionButton>
      </ActionBar>
    </>
  );
};
