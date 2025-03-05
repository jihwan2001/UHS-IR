import { useNavigate } from "react-router-dom";
import symbolMark from "../../img/symbolMark.png";
import { LogoWrapper, LogoImage, LogoText } from "../styles";

interface LogoProps {
  fontSize?: string; // 선택적 props 추가
  logoSize?: string;
}

export const Logo = ({
  fontSize = "1.125rem",
  logoSize = "2rem",
}: LogoProps) => {
  const navigate = useNavigate();

  return (
    <LogoWrapper onClick={() => navigate("/")}>
      <LogoImage logoSize={logoSize} src={symbolMark} alt="Logo" />
      <LogoText fontSize={fontSize}>UHS IR</LogoText>{" "}
      {/* fontSize props 전달 */}
    </LogoWrapper>
  );
};
