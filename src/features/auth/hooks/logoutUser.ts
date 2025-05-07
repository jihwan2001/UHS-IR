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
      clearAuthState(); // ✅ 공통 클라이언트 정리
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const clearAuthState = () => {
    setAuth({
      isAuthenticated: false,
      username: null,
      userAccount: null,
      userPosition: null,
    });
    localStorage.clear();
    window.location.reload();
  };

  return { logout, clearAuthState };
};
