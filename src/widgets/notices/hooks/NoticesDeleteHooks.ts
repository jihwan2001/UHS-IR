import { useState } from "react";
import { FileDelete } from "../../../features/notices/hooks/FileDelete";

interface SelectedNotice {
  id: number;
  isPinned: boolean;
}

export const useNoticesDelete = () => {
  const [selectedNotices, setSelectedNotices] = useState<SelectedNotice[]>([]); // ✅ 선택된 공지 객체 저장

  const handleDelete = async () => {
    if (selectedNotices.length === 0) return;

    if (window.confirm("선택한 항목을 삭제하시겠습니까?")) {
      try {
        await Promise.all(
          selectedNotices.map((notice) => FileDelete(notice.id))
        );
        alert("삭제가 완료되었습니다.");
        setSelectedNotices([]); // ✅ 선택 초기화
      } catch (error) {
        console.error("삭제 오류:", error);
      }
    }
  };

  return { selectedNotices, setSelectedNotices, handleDelete };
};
