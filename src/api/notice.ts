import axios from "axios";

/**
 * 공지사항 검색 API 호출
 * @param title 검색어 (공지사항 제목)
 * @returns 검색된 공지사항 목록
 */
export const getSearch = async (title: string) => {
  try {
    const response = await axios.get("http://localhost:8080/api/board/search", {
      params: { title },
    });
    return response.data || [];
  } catch (error) {
    console.error("🔴 공지사항 검색 실패:", error);
    return [];
  }
};

export const getInfo = async (pageNum: number) => {
  try {
    const response = await axios.get("http://localhost:8080/api/board/list", {
      params: { pageNum }, // API가 기대하는 파라미터 이름 확인
    });
    console.log(`Page ${pageNum} 데이터:`, response.data); // 응답 확인
    console.log(`개수 :`, response.data.length);

    return response.data; // 전체 응답 반환
  } catch (error) {
    console.error("응답 처리 오류:", error);
    throw error;
  }
};
