import { useState } from "react";
import { checkPassword } from "../../../features/auth/hooks/checkPassword";

interface UsePasswordConfirmProps {
  user_id: number | string;
}

export const usePasswordConfirm = ({ user_id }: UsePasswordConfirmProps) => {
  const [okPw, setOkPw] = useState<string>(""); // 입력된 비밀번호
  const [checkPw, setCheckPw] = useState(true); // 비밀번호 확인 여부
  const [showDetails, setShowDetails] = useState(false); // 성공 시 세부 정보 표시

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOkPw(e.target.value);
  };

  const userPwSubmit = async () => {
    // user_id를 문자열로 변환해서 넘김
    const success = await checkPassword(user_id.toString(), okPw);

    if (success) {
      setCheckPw(false);
      setShowDetails(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
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
