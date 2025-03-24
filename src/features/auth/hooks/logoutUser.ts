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
      setAuth({ isAuthenticated: false, username: null }); // ✅ 로그인 상태 초기화
      window.location.reload(); // ✅ 새로고침하여 UI 업데이트
      localStorage.clear();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }

    
  };

  return logout;
};