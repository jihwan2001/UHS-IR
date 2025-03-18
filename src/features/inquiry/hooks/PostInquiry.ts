import axios from "axios";
import { useState } from "react";

export const usePostInquiry = () => {
  const [complainTitle, setComplainTitle] = useState<string>("");
  const [complainDescription, setComplainDescription] = useState<string>("");

  const postInquiry = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/complain/add", {
        complainTitle,
        complainDescription,
      });

      // 성공시 필드값 초기화
      setComplainTitle("");
      setComplainDescription("");

      alert("문의가 성공적으로 접수되었습니다.");
    } catch (error) {
      alert("문의 전송에 실패했습니다. 다시 시도해주세요.");
      console.error("에러 발생:", error);
    }
  };
  return {
    complainTitle,
    setComplainTitle,
    complainDescription,
    setComplainDescription,
    postInquiry,
  };
};