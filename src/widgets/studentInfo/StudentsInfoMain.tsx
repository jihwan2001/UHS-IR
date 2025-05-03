import { useState } from "react";
import { deleteStudents } from "./hooks/useDeleteStu";
import { StudentsBulkActionBar, StudentsTable } from "../../features";
import { useStudentsData } from "./hooks/useStudentsData";

export const StudentsInfoMain = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { students, loading, error } = useStudentsData();
  const handleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.length === students.length ? [] : students.map((s) => s.userId)
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    await deleteStudents(selectedIds);
    setSelectedIds([]);
  };
  return (
    <>
      <StudentsBulkActionBar
        isAllChecked={selectedIds.length === students.length}
        isAnyChecked={selectedIds.length > 0} // ✅ 여기
        onSelectAll={handleSelectAll}
        onDelete={handleDelete}
      />
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
      ) : error ? (
        alert("데이터를 불러오는 중 오류가 발생했습니다.")
      ) : (
        <StudentsTable
          students={students}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      )}
    </>
  );
};
