import { ReactNode } from "react"; // ReactNode 타입 가져오기
import { StyledButton } from "../styles"; // 스타일 import

// Props 타입 정의
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

// Button 컴포넌트 수정
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};
