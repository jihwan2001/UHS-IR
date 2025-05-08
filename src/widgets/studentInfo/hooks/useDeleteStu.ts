// hooks/useDeleteStudents.ts

import axios from "axios";

export const deleteStudents = async (ids: number[]) => {
  if (!ids || ids.length === 0) {
    alert("삭제할 항목이 없습니다.");
    return;
  }

  try {
    await axios.delete("http://localhost:8080/api/account/delete/student", {
      data: ids,
      headers: { "Content-Type": "application/json" },
    });

    alert("선택된 학생이 삭제되었습니다.");
    window.location.reload();
  } catch (error) {
    console.error("삭제 중 에러:", error);
    alert("삭제 중 오류가 발생했습니다.");
  }
};
