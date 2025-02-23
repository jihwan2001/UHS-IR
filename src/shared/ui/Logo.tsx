import { useNavigate } from "react-router-dom";
import symbolMark from "../../img/symbolMark.png";
import { LogoWrapper, LogoImage, LogoText } from "../styles";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <LogoWrapper onClick={() => navigate("/")}>
      <LogoImage src={symbolMark} alt="Logo" />
      <LogoText>UHS IR</LogoText>
    </LogoWrapper>
  );
};
