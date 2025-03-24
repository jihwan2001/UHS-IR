import { useState } from "react";
import { ActionBar, ActionButton } from "../notices/styles";

export const InquiryBulkActionBar = () => {
  // 선택된 버튼을 관리하는 상태
  const [selected, setSelected] = useState("전체보기");

  return (
    <ActionBar>
      <ActionButton
        onClick={() => setSelected("전체보기")}
        className={selected === "전체보기" ? "active" : "inactive"} // CSS로 활성/비활성 구분
      >
        전체보기
      </ActionButton>
      <ActionButton
        onClick={() => setSelected("처리됨")}
        className={selected === "처리됨" ? "active" : "inactive"}
      >
        처리됨
      </ActionButton>
      <ActionButton
        onClick={() => setSelected("대기중")}
        className={selected === "대기중" ? "active" : "inactive"}
      >
        대기중
      </ActionButton>
    </ActionBar>
  );
};