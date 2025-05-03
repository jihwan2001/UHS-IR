import { useState } from "react";
import { deleteTeachers } from "./hooks/useDeleteTeachers";
import { TeachersBulkActionBar, TeachersTable } from "../../features";
import { useTeachersData } from "./hooks/useTeachersData";

export const TeachertsInfoMain = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { teachers, loading, error } = useTeachersData();

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
        isAllChecked={selectedIds.length === teachers.length}
        isAnyChecked={selectedIds.length > 0} // ✅ 여기
        onSelectAll={handleSelectAll}
        onDelete={handleDelete}
      />
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>
      ) : error ? (
        alert("데이터를 불러오는 중 오류가 발생했습니다.")
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
