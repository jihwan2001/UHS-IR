import { useState } from "react";
import { dummyData } from "../../features/studentsInfo/dummyData";
import { deleteTeachers } from "./hooks/useDeleteTeachers";
import { TeachersBulkActionBar, TeachersTable } from "../../features";
import { useTeachersData } from "./hooks/useTeachersData";

export const TeachertsInfoMain = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { teachers, loading } = useTeachersData();

  const handleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.length === teachers.length ? [] : teachers.map((s) => s.userId)
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    await deleteTeachers(selectedIds);
    setSelectedIds([]);
  };
  return (
    <>
      <TeachersBulkActionBar
        isAllChecked={selectedIds.length === dummyData.length}
        isAnyChecked={selectedIds.length > 0} // ✅ 여기
        onSelectAll={handleSelectAll}
        onDelete={handleDelete}
      />
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
      ) : (
        <TeachersTable
          teachers={teachers}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      )}
    </>
  );
};
