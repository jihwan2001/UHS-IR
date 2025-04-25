import { useEffect, useRef } from "react";
import { useLogout } from "./hooks/logoutUser";

export const AutoLogoutManager = () => {
  const logout = useLogout();
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const TEN_MINUTES = 10 * 60 * 1000;

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const startLogoutTimer = () => {
    clearLogoutTimer();
    logoutTimerRef.current = setTimeout(() => {
      logout();
      alert("10분이 지나서 로그아웃 되었습니다.");
    }, TEN_MINUTES);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // 화면이 보이지 않을 때 타이머 시작
        startLogoutTimer();
      } else if (document.visibilityState === "visible") {
        // 화면이 다시 보이면 타이머 취소
        clearLogoutTimer();
      }
    };

    const handlePageHide = () => {
      // 페이지가 사라질 때 타이머 시작
      startLogoutTimer();
    };

    const handlePageShow = () => {
      // 페이지가 다시 보이면 타이머 취소 (모바일에서 유용)
      clearLogoutTimer();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
      clearLogoutTimer();
    };
  }, [logout]);

  return null;
};
