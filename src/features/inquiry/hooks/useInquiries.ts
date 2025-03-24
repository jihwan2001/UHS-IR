import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ComplainItem } from "../model";

export const useInquiries = () => {
  const [inquiries, setInquiries] = useState<ComplainItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost:8080/api/complain/list"
      );

      console.log("📌 API 응답 데이터:", response.data);

      if (response.data && Array.isArray(response.data)) {
        setInquiries(response.data);
      } else {
        console.error("📌 API 응답이 예상과 다름:", response.data);
        setInquiries([]);
      }
    } catch (error) {
      console.error("문의 사항 목록 불러오기 오류:", error);
      setError("문의 사항을 불러오는 중 오류가 발생했습니다.");
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  return { inquiries, loading, error };
};