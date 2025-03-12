// 📂 NoticesPuttHooks.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useUpdateNotice = (
  boardId: string | undefined,
  title: string,
  description: string,
  userId: number,
  fileIds: number[],
  files: File[]
) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!boardId) {
      alert("공지사항 ID를 찾을 수 없습니다.");
      return;
    }

    const formData = new FormData();
    // ✅ 현재 날짜 자동 생성 (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // JSON 데이터 생성
    const dto = {
      boardTitle: title,
      boardDescription: description,
      boardDate: today, // ✅ 현재 날짜로 설정
      userId,
      fileIds,
    };
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setLoading(true); // ✅ 로딩 시작
      await axios.put(
        `http://localhost:8080/api/board/detail/fix/${boardId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // ✅ Content-Type 수정
        }
      );

      alert("공지사항이 성공적으로 수정되었습니다.");
      navigate(-1); // ✅ 이전 페이지로 이동
    } catch (error) {
      console.error("공지사항 수정 오류:", error);
      alert("공지사항 수정에 실패했습니다.");
    } finally {
      setLoading(false); // ✅ 로딩 종료
    }
  };

  return { handleUpdate, loading };
};
