import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "../../../authAtom";

export const useAuthCheck = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/login/me", {
          withCredentials: true,
        });

        setAuth({
          isAuthenticated: true,
          username: res.data.username,
          userAccount: res.data.userAccount,
          userPosition: res.data.userPosition,
          authLoading: false, // ✅ 완료
        });
      } catch (err) {
        console.warn("인증 실패 또는 비로그인 상태");
        setAuth({
          isAuthenticated: false,
          username: null,
          userAccount: null,
          userPosition: null,
          authLoading: false, // ✅ 실패해도 로딩 종료
        });
      }
    };

    checkAuth();
  }, [setAuth]);
};
