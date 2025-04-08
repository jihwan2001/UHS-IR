import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { authState } from "./authAtom";

// ✅ 로그인 세션을 체크하는 커스텀 훅
export const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/login/session", {
          withCredentials: true, // ✅ JSESSIONID 쿠키 포함 요청
        });

        if (res.data.username) {
          setAuth({
            isAuthenticated: true,
            username: res.data.username,
            userAccount: res.data.userAccount,
            userPosition: res.data.userPosition,
          });
        }
      } catch (error) {
        console.log("❌ 로그인 세션 없음 또는 만료됨");
        setAuth({
          isAuthenticated: false,
          username: null,
          userAccount: null,
          userPosition: null,
        });
      }
    };

    checkSession();
  }, [setAuth]); // ✅ 처음 실행될 때 한 번만 체크

  return null; // ✅ 이 훅은 상태만 설정하고, 렌더링할 필요 없음
};
