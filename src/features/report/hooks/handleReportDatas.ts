import { useEffect, useState } from "react";
import { getReportDatas } from "./getReportDatas";
import { ReportProps } from "../types";

export const useReportDatas = (reportGroup: string, pageNumber: number) => {
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1); // ✅ totalPages도 추가

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await getReportDatas(reportGroup, pageNumber); // ✅ pageNumber 넘겨줌
        console.log("📌 API 응답:", data);

        if (!data) {
          throw new Error("잘못된 응답");
        }

        if (Array.isArray(data)) {
          setReports(data);
          setTotalPages(1); // 배열만 오면 1페이지
        } else {
          setReports(data.content || []);
          setTotalPages(data.totalPages ?? 1); // totalPages 받아오기
        }
      } catch (err) {
        console.error("보고서 로딩 실패:", err);
        setError("데이터를 불러오는 중 오류 발생");
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [reportGroup, pageNumber]); // ✅ reportGroup, pageNumber 바뀌면 다시 호출

  return { reports, loading, error, totalPages };
};
