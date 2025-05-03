// hooks/handleDelete.ts
import { ReportItems } from "../../../../features/report/types";
import { deleteReports } from "./useDeleteReports";

interface HandleDeleteProps {
  selectedIds: number[];
  reports: ReportItems[];
  pageNumber: number;
  setSelectedIds: (ids: number[]) => void;
  setPageNumber: (page: number) => void;
  refetch: () => Promise<void>;
}

export const handleDelete = async ({
  selectedIds,
  reports,
  pageNumber,
  setSelectedIds,
  setPageNumber,
  refetch,
}: HandleDeleteProps) => {
  if (selectedIds.length === 0) return;
  const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
  if (!confirmDelete) return;

  try {
    await deleteReports(selectedIds);
    alert("삭제되었습니다.");
    setSelectedIds([]);

    if (reports.length === selectedIds.length && pageNumber > 1) {
      setPageNumber(pageNumber - 1); // 마지막 항목까지 삭제
    } else {
      await refetch(); // 현재 페이지 유지
    }
  } catch (err) {
    alert("삭제에 실패했습니다.");
  }
};
