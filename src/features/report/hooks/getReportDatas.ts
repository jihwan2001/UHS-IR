import axios from "axios";

export const getReportDatas = async (reportGroup: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/report/list`, {
      params: {
        reportGroup,
      },
    });
    return response.data; // 받아온 데이터를 반환
  } catch (error) {
    console.error("보고서 받아오기 에러:", error);
    throw error;
  }
};
