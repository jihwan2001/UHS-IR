import { useNavigate } from "react-router-dom";
import loginIcon from "../../../img/login.png";
import { ButtonWrapper, Icon } from "../styles";
import { useRecoilValue } from "recoil";
import { authState } from "../../../authAtom";
import { useLogout } from "../hooks/logoutUser";
import { useUserRole } from "../../../shared/utils/userRoleUtil";

export const LoginButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useRecoilValue(authState); // ✅ 로그인 상태 가져오기
  const userRole = useUserRole(); // ✅ 역할 받아오기
  const logout = useLogout(); // ✅ useLogout 훅 사용

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      logout(); // ✅ 로그아웃 실행
    }
  };

  return (
    <ButtonWrapper
      onClick={() =>
        isAuthenticated ? handleLogout() : navigate("/loginPage")
      }
    >
      <span>{isAuthenticated ? `${userRole} ${username}` : "Login"}</span>
      {/* ✅ 로그인한 유저 이름 표시 */}
      <Icon src={loginIcon} alt="Login" />
    </ButtonWrapper>
  );
};
