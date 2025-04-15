import { useState } from "react";
import { ActionBar, ActionButton } from "../notices/styles";

interface Props {
  onFilterChange: (state: string) => void;
}

export const InquiryBulkActionBar = ({ onFilterChange }: Props) => {
  const [selected, setSelected] = useState("전체보기");

  const handleClick = (value: string) => {
    setSelected(value);
    onFilterChange(value);
  };

  return (
    <ActionBar>
      <ActionButton
        onClick={() => handleClick("전체보기")}
        className={selected === "전체보기" ? "active" : "inactive"}
      >
        전체보기
      </ActionButton>
      <ActionButton
        onClick={() => handleClick("처리됨")}
        className={selected === "처리됨" ? "active" : "inactive"}
      >
        처리됨
      </ActionButton>
      <ActionButton
        onClick={() => handleClick("대기중")}
        className={selected === "대기중" ? "active" : "inactive"}
      >
        대기중
      </ActionButton>
    </ActionBar>
  );
};