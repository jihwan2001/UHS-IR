import { useLocation } from "react-router-dom";

const ReportPdfHistory = () => {
  const location = useLocation();
  const { currentDirId } = location.state || { currentDirId: 0 }; // 기본값 0 설정

  return (
    <div>
      <h1>History for Directory ID: {currentDirId}</h1>
      {/* 히스토리 데이터 표시 */}
    </div>
  );
};

export default ReportPdfHistory;
