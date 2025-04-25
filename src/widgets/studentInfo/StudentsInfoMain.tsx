import { useState } from "react";
import { dummyData } from "../../features/studentsInfo/dummyData";
import { deleteStudents } from "./hooks/useDeleteStu";
import { StudentsBulkActionBar, StudentsTable } from "../../features";
import { useStudentsData } from "./hooks/useStudentsData";

export const StudentsInfoMain = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { students, loading } = useStudentsData();
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
        isAllChecked={selectedIds.length === dummyData.length}
        isAnyChecked={selectedIds.length > 0} // ✅ 여기
        onSelectAll={handleSelectAll}
        onDelete={handleDelete}
      />
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
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
