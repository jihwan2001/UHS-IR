import axios from "axios";

export const FilePin = async (id: number, isPinned: boolean) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/pin/${id}`,
      { isPinned } // ✅ API에 `isPinned` 값 전달
    );
    console.log("고정 상태 변경 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("고정 상태 변경 실패:", error);
  }
};
