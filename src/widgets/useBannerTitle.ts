import { useLocation } from "react-router-dom";

export const useBannerTitle = (): string => {
  const location = useLocation();

  const titles: Record<string, string> = {
    "/center": "센터 소개",
    "/stats-yearbook": "대학 통계",
    "/analysis-reports": "대학 통계",
    "/announcement": "커뮤니티",
    "/inquiry": "커뮤니티",
  };

  return titles[location.pathname] || "센터 소개";
};
