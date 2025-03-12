import { useState } from "react";
import { FilePin } from "../../../features/notices/hooks/FilePin";

export const useNoticePin = (fetchNotices: () => void) => {
  const [loading, setLoading] = useState(false);

  const handlePinToggle = async (
    selectedNotices: { id: number; isPinned: boolean }[]
  ) => {
    if (selectedNotices.length === 0) return;

    setLoading(true);
    try {
      await Promise.all(
        selectedNotices.map(({ id, isPinned }) => FilePin(id, !isPinned))
      );

      alert("공지사항 고정 상태가 변경되었습니다.");
      fetchNotices(); // ✅ 목록 다시 불러오기 (최신 데이터 반영)
    } catch (error) {
      console.error("공지사항 고정 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handlePinToggle, loading };
};
