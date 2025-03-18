import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginIcon from "../../../img/login.png";
import { ButtonWrapper, Icon } from "../styles";
import { useRecoilValue } from "recoil";
import { authState } from "../../../authAtom";

export const LoginButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useRecoilValue(authState); // ✅ Recoil 상태 가져오기

  return (
    <ButtonWrapper
      onClick={() =>
        isAuthenticated ? alert("이미 로그인됨") : navigate("/loginPage")
      }
    >
      <span>{isAuthenticated ? username : "Login"}</span>{" "}
      {/* ✅ 로그인한 유저 이름 표시 */}
      <Icon src={loginIcon} alt="Login" />
    </ButtonWrapper>
  );
};
