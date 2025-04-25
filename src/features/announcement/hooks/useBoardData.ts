import { useState, useEffect } from "react";
import axios from "axios";
import { NoticeItem } from "../../../widgets/notices/model";
// import { BoardDataProps } from "../model";

export const useBoardData = (initialPage: number = 1) => {
  const [datas, setDatas] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1); // 총 페이지 수

  const getBoardDatas = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://localhost:8080/api/main/board/list",
        {
          params: { pageNum: page },
        }
      );

      setDatas(res.data.boards); // API 구조 확인 필요
      setTotalPages(res.data.totalPages); // API에서 총 페이지 수 제공해야 함
    } catch (error) {
      console.error("에러 발생:", error);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoardDatas(pageNumber);
  }, [pageNumber]);

  return { datas, loading, error, pageNumber, setPageNumber, totalPages };
};
