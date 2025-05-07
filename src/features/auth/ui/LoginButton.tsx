import { useNavigate } from "react-router-dom";
import loginIcon from "../../../img/login.png";
import { ButtonWrapper, Icon } from "../styles";
import { useRecoilValue } from "recoil";
import { authState } from "../../../authAtom";
import { useLogout } from "../hooks/logoutUser";
import { useUserRole } from "../../../shared/utils/userRoleUtil";

export const LoginButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useRecoilValue(authState);
  const userRole = useUserRole();
  const { logout } = useLogout(); // ✅ 구조 분해로 logout만 사용

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await logout(); // ✅ await 추가
    }
  };

  return (
    <ButtonWrapper
      onClick={() =>
        isAuthenticated ? handleLogout() : navigate("/loginPage")
      }
    >
      <span>{isAuthenticated ? `${userRole} ${username}` : "Login"}</span>
      <Icon src={loginIcon} alt="Login" />
    </ButtonWrapper>
  );
};
