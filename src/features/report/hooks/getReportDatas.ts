import axios from "axios";

export const getReportDatas = async (
  reportGroup: string,
  pageNumber: number
) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/report/list`, {
      params: {
        report_group: reportGroup, // ✅ 서버 요구에 맞게 이름 맞추기
        pageNum: pageNumber, // ✅ 페이지 번호 추가
        pageSize: 10, // ✅ 한 페이지당 10개 가져오자 (고정)
      },
    });
    return response.data;
  } catch (error) {
    console.error("보고서 받아오기 에러:", error);
    throw error;
  }
};
