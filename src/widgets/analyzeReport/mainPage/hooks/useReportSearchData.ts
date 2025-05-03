import { useState, useEffect } from "react";
import axios from "axios";
import { ReportItems } from "../../../../features/report/types";

export const useReportSearchData = (
  keyword: string,
  year: number,
  page: number
) => {
  const [reports, setReports] = useState<ReportItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/main/report/search`,
          {
            params: {
              keyword,
              year,
              page,
              size: 10,
            },
          }
        );

        const data = response.data;
        console.log("📌 검색 결과:", data);

        setReports(data.content || []);
        setTotalPages(data.totalPages ?? 1);
      } catch (err) {
        console.error("검색 실패:", err);
        setError("검색 중 오류 발생");
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [keyword, year, page]);

  return { reports, loading, error, totalPages };
};
