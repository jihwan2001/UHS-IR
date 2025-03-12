import { useState, useEffect } from "react";
import axios from "axios";

export const useNoticesFetch = () => {
  const [notices, setNotices] = useState([]); // ✅ 공지사항 목록 상태 추가
  const [loading, setLoading] = useState(false);

  // ✅ 공지사항 목록을 불러오는 함수
  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/board/list");
      setNotices(response.data);
    } catch (error) {
      console.error("공지사항 목록 불러오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return { notices, fetchNotices, loading };
};
