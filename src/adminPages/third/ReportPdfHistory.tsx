import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RMcss from "./RMcss";
import back from "../../img/back.png";

interface HistoryData {
  file_id: number;
  version_num: number;
  version_add: string | null;
  version_delete: string | null;
  version_date: string;
}

const ReportPdfHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentDirId } = location.state || { currentDirId: 0 }; // 기본값 0 설정

  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/files/${currentDirId}/download`
        );
        setHistoryData(response.data);
      } catch (error) {
        console.error("Api 호출 중 에러 발생 : ", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getHistoryData();
  }, [currentDirId]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <RMcss.FileTitle>
        History for Directory ID: {currentDirId}
      </RMcss.FileTitle>
      <RMcss.ButtonContainer>
        <RMcss.BackButton onClick={handleBack}>
          <img src={back} alt="Back" /> 뒤로가기
        </RMcss.BackButton>
      </RMcss.ButtonContainer>
      <RMcss.InfoContainer>
        <RMcss.InfoTitle flexValue={1}>버전</RMcss.InfoTitle>
        <RMcss.InfoDetails flexValue={3}>추가</RMcss.InfoDetails>
        <RMcss.InfoDetails flexValue={3}>삭제</RMcss.InfoDetails>
        <RMcss.InfoDetails flexValue={1}>작성자</RMcss.InfoDetails>
        <RMcss.InfoDate flexValue={1}>업로드 일자</RMcss.InfoDate>
      </RMcss.InfoContainer>

      {historyData.length > 0 ? (
        historyData.map((item) => (
          <RMcss.ContentsContainer key={item.version_num} cursorValue="default">
            <RMcss.ContentTitle flexValue={1}>
              {item.version_num}
            </RMcss.ContentTitle>
            <RMcss.ContentDetails flexValue={3}>
              {item.version_add || "-"}
            </RMcss.ContentDetails>
            <RMcss.ContentDetails flexValue={3}>
              {item.version_delete || "-"}
            </RMcss.ContentDetails>
            <RMcss.ContentDate flexValue={1}>
              {item.version_date || "-"}
            </RMcss.ContentDate>
          </RMcss.ContentsContainer>
        ))
      ) : (
        <p style={{ textAlign: "center", padding: "20px" }}>
          변경 내역이 없습니다.
        </p>
      )}
    </div>
  );
};

export default ReportPdfHistory;
