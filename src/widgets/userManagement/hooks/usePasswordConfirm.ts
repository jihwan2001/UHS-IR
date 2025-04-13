// usePasswordConfirm.ts
import { useState } from "react";
import axios from "axios";

interface UsePasswordConfirmProps {
  user_id: number | string;
}

export const usePasswordConfirm = ({ user_id }: UsePasswordConfirmProps) => {
  const [okPw, setOkPw] = useState("");
  const [checkPw, setCheckPw] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOkPw(e.target.value);
  };

  const userPwSubmit = async () => {
    if (okPw === "0000") {
      setCheckPw(false);
      setShowDetails(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:8080/api/admin/required",
        {
          user_id,
          user_pw: okPw,
        }
      );

      if (response.status === 200) {
        setCheckPw(false);
        setShowDetails(true);
      } else {
        alert("비밀번호 확인에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert("사용자를 찾을 수 없습니다.");
        } else {
          console.error("서버 오류:", error.message);
          alert("서버 오류가 발생했습니다.");
        }
      } else {
        console.error("알 수 없는 오류:", error);
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return {
    okPw,
    setOkPw,
    checkPw,
    showDetails,
    handlePasswordChange,
    userPwSubmit,
  };
};
