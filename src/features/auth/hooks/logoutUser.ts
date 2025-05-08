import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "../../../authAtom";

export const useLogout = () => {
  const setAuth = useSetRecoilState(authState);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/login/logout",
        {},
        { withCredentials: true }
      );
      alert("로그아웃 되었습니다.");
      clearAuthState(); // ✅ 상태 및 저장소 정리
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const clearAuthState = () => {
    const cleared = {
      isAuthenticated: false,
      username: null,
      userAccount: null,
      userPosition: null,
    };
    setAuth(cleared);
    localStorage.removeItem("auth"); // ✅ 전체 삭제 대신 auth 정보만 제거
    // window.location.reload(); ❌ 제거
  };

  return { logout, clearAuthState };
};
