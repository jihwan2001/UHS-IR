import { useNavigate } from "react-router-dom";
import loginIcon from "../../../img/login.png"; // 로그인 아이콘 경로
import { ButtonWrapper, Icon } from "../styles";

export const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <ButtonWrapper onClick={() => navigate("/loginPage")}>
      {/* login은 나중에 로그인을 하면 사용자 이름으로 바뀌 도록 설정 하기 */}
      <span>Login</span>
      <Icon src={loginIcon} alt="Login" />
    </ButtonWrapper>
  );
};
