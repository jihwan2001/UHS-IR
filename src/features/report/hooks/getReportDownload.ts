import axios from "axios";

export const getReportDownload = async (reportId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080//api/report/download/pdf`,
      {
        params: {
          reportId,
        },
      }
    );
    return response.data; // 받아온 데이터를 반환
  } catch (error) {
    console.error("보고서 다운로드 에러:", error);
    throw error;
  }
};
