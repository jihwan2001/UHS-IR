import axios from "axios";

export const getReportDatas = async (
  reportName: string,
  pageNumber: number
) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/report/list`, {
      params: {
        reportName, // ✅ 서버와 변수명 일치
        pageNum: pageNumber,
        pageSize: 10,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("보고서 받아오기 에러:", error);
    throw error;
  }
};
