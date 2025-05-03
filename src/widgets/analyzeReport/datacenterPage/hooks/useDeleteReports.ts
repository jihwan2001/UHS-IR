// useDeleteReports.ts
import axios from "axios";

export const deleteReports = async (selectedIds: number[]) => {
  try {
    const response = await axios.delete("/api/report/delete/batch", {
      data: selectedIds,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("보고서 삭제 중 에러 발생:", error);
    throw new Error("보고서 삭제를 실패했습니다.");
  }
};
