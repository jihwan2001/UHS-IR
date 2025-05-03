import { useEffect, useState } from "react";
import { ReportBulkActionBar } from "../../../features/report/datacenterPage/ReportBulkActionBar";
import { ReportTable } from "../../../features/report/datacenterPage/ReportTable";
import { useReportDatas } from "../../../features/report/hooks/useReportDatas";
import { deleteReports } from "./hooks/useDeleteReports";
import { handleDelete } from "./hooks/handleDelete";

export const ReportMain = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [reportGroup] = useState("SCHOOL"); // 🔸 추후 prop으로 분리 가능
  const [pageNumber, setPageNumber] = useState(1);

  const { reports, loading, error, totalPages, refetch } = useReportDatas(
    reportGroup,
    pageNumber
  );

  // 에러 발생 시 alert 처리
  useEffect(() => {
    if (error) {
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  }, [error]);

  const handleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.length === reports.length ? [] : reports.map((r) => r.reportId)
    );
  };

  const onDelete = () =>
    handleDelete({
      selectedIds,
      reports,
      pageNumber,
      setSelectedIds,
      setPageNumber,
      refetch,
    });

  return (
    <>
      <ReportBulkActionBar
        isAllChecked={selectedIds.length === reports.length}
        isAnyChecked={selectedIds.length > 0}
        onSelectAll={handleSelectAll}
        onDelete={onDelete}
      />
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
      ) : (
        <ReportTable
          reports={reports}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      )}
    </>
  );
};
