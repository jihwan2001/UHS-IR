import { useNavigate } from "react-router-dom";
import loginIcon from "../../../img/login.png";
import { ButtonWrapper, Icon } from "../styles";
import { useRecoilValue } from "recoil";
import { authState } from "../../../authAtom";
import { useLogout } from "../hooks/logoutUser";
import { useState } from "react";

export const LoginButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username, userPosition } = useRecoilValue(authState); // ✅ 로그인 상태 가져오기
  const logout = useLogout(); // ✅ useLogout 훅 사용

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      logout(); // ✅ 로그아웃 실행
    }
  };
  const [userRole, setUserRole] = useState("");
  if (userPosition === 0) {
    setUserRole("학생");
  } else if (userPosition === 1) {
    setUserRole("교사");
  } else if (userPosition === 2) {
    setUserRole("관리자");
  }
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
