import { getReportDownload } from "./getReportDownload";

export const handleRowClick = async (reportId: number) => {
  try {
    const data = await getReportDownload(reportId);
    console.log("다운로드 받은 데이터:", data);
    // 여기서 파일 다운로드 처리 추가할 수 있음
  } catch (error) {
    console.error("다운로드 실패:", error);
  }
};
