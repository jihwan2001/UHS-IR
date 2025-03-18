import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { NoticeItem } from "../model";

export const useNotices = (sortType: string) => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/board/list?sortType=${sortType}`,
        { withCredentials: true }
      );

      console.log("📌 API 응답 데이터:", response.data);

      if (response.data && Array.isArray(response.data.content)) {
        const formattedNotices = response.data.content.map(
          (item: NoticeItem) => ({
            ...item,
            isPinned: item.isPinned === true || Number(item.isPinned) === 1,
          })
        );

        console.log("📌 변환된 Notices 데이터:", formattedNotices);
        setNotices(formattedNotices);
      } else {
        console.error("📌 API 응답이 예상과 다름:", response.data);
        setNotices([]);
      }
    } catch (error) {
      console.error("공지사항 목록 불러오기 오류:", error);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      setNotices([]);
    } finally {
      setLoading(false);
    }
  }, [sortType]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return { notices, loading, error };
};