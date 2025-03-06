import { useState } from "react";
import { FileDelete } from "../../../features/notices/hooks/FileDelete";

export const useNoticesDelete = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // ✅ 선택된 ID 목록

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    if (window.confirm("선택한 항목을 삭제하시겠습니까?")) {
      try {
        await Promise.all(selectedIds.map((id) => FileDelete(id)));
        alert("삭제가 완료되었습니다.");
        setSelectedIds([]); // ✅ 선택된 ID 초기화
      } catch (error) {
        console.error("삭제 오류:", error);
      }
    }
  };

  return { selectedIds, setSelectedIds, handleDelete };
};
