import { useEffect, useState, useCallback } from "react";
import { getReportDatas } from "./getReportDatas";
import { ReportItems } from "../types";

export const useReportDatas = (reportGroup: string, pageNumber: number) => {
  const [reports, setReports] = useState<ReportItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  // ✅ 재사용 가능한 fetch 함수 (refetch용)
  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getReportDatas(reportGroup, pageNumber);
      console.log("📌 API 응답:", data);

      if (!data) {
        throw new Error("잘못된 응답");
      }

      if (Array.isArray(data)) {
        setReports(data);
        setTotalPages(1);
      } else {
        setReports(data.content || []);
        setTotalPages(data.totalPages ?? 1);
      }
    } catch (err) {
      console.error("보고서 로딩 실패:", err);
      setError("데이터를 불러오는 중 오류 발생");
    } finally {
      setLoading(false);
    }
  }, [reportGroup, pageNumber]);

  // ✅ 최초 및 의존성 변경 시 자동 호출
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // ✅ fetchReports를 refetch로 리턴에 포함
  return { reports, loading, error, totalPages, refetch: fetchReports };
};
