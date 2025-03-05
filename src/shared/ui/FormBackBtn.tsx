import { useNavigate } from "react-router-dom";
import { BackButton } from "../styles";

interface FormBackBtnProps {
  children?: string; // 원하는 글자를 넣을 수 있도록 props 추가
}

export const FormBackBtn = ({ children }: FormBackBtnProps) => {
  const navigate = useNavigate();

  return (
    <BackButton onClick={() => navigate(-1)}>{children || "목록"}</BackButton>
  );
};
