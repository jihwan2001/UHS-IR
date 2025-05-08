import { useEffect, useState } from "react";
import axios from "axios";
import { ReportItems } from "../../../../features/report/types";
import { getReportDatas } from "../../../../features/report/hooks/getReportDatas";

export const useDynamicReportData = (
  keyword: string,
  year: number,
  page: number
) => {
  const [reports, setReports] = useState<ReportItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError("");

      try {
        // ✅ 조건: 검색어 또는 연도가 바뀐 경우 검색 API
        if (keyword || year !== new Date().getFullYear()) {
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
          setReports(response.data.content || []);
          setTotalPages(response.data.totalPages ?? 1);
        } else {
          // ✅ 기본 전체 조회 API
          const response = await getReportDatas("협성대학교", page);
          setReports(response.content || []);
          setTotalPages(response.totalPages ?? 1);
        }
      } catch (err) {
        setError("데이터 불러오는 중 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [keyword, year, page]);

  return { reports, loading, error, totalPages };
};
