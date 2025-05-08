import { useEffect, useRef } from "react";
import { useLogout } from "./hooks/logoutUser";
import { useRecoilValue } from "recoil";
import { authState } from "../../authAtom";

export const AutoLogoutManager = () => {
  const { logout } = useLogout(); // ❌ clearAuthState 제거
  const isAuthenticated = useRecoilValue(authState).isAuthenticated;
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const TEN_MINUTES = 10 * 60 * 1000;

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const startLogoutTimer = () => {
    if (!isAuthenticated) return;
    clearLogoutTimer();
    logoutTimerRef.current = setTimeout(() => {
      logout();
      alert("10분이 지나서 자동으로 로그아웃되었습니다.");
    }, TEN_MINUTES);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        startLogoutTimer();
      } else if (document.visibilityState === "visible") {
        clearLogoutTimer();
      }
    };

    const handlePageHide = () => startLogoutTimer();
    const handlePageShow = () => clearLogoutTimer();

    // ❌ 새로고침 시 logout 방지: beforeunload 제거
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
      clearLogoutTimer();
    };
  }, [logout, isAuthenticated]);

  return null;
};
