import axios from "axios";

export const FileDelete = async (id: number) => {
  if (!id) {
    console.error("삭제할 ID가 없습니다.");
    return;
  }

  try {
    const response = await axios.delete(
      `http://localhost:8080/api/board/delete/${id}`
    );
    console.log("삭제 성공:", response.data);
    alert("삭제되었습니다.");
  } catch (error) {
    alert("오류가 발생했습니다.");
    console.error("삭제 실패:", error);
  }
};
