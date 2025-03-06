import { useState } from "react";
import { FilePin } from "../../../features/notices/hooks/FilePin";

export const useNoticePin = () => {
  const [loading, setLoading] = useState(false); // ✅ 로딩 상태 추가

  // ✅ 공지사항 고정/해제 함수
  const handlePinToggle = async (selectedIds: number[], isPinned: boolean) => {
    if (selectedIds.length === 0) return;

    setLoading(true);
    try {
      await Promise.all(selectedIds.map((id) => FilePin(id, isPinned)));
      alert(
        isPinned
          ? "공지사항이 고정되었습니다."
          : "공지사항 고정이 해제되었습니다."
      );
    } catch (error) {
      console.error("공지사항 고정 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handlePinToggle, loading };
};
