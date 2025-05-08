import { useEffect, useState, useCallback } from "react";
import { getReportDatas } from "./getReportDatas";
import { ReportItems } from "../types";

export const useReportDatas = (reportName: string, pageNumber: number) => {
  const [reports, setReports] = useState<ReportItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getReportDatas(reportName, pageNumber);
      console.log("📌 API 응답:", data);

      if (!data) {
        throw new Error("잘못된 응답");
      }

      setReports(data.content || []);
      setTotalPages(data.totalPages ?? 1);
    } catch (err) {
      console.error("보고서 로딩 실패:", err);
      setError("데이터를 불러오는 중 오류 발생");
    } finally {
      setLoading(false);
    }
  }, [reportName, pageNumber]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { reports, loading, error, totalPages, refetch: fetchReports };
};
