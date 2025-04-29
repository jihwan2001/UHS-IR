import { useEffect, useState } from "react";
import { getReportDatas } from "./getReportDatas"; // 기존 가져오기
import { ReportProps } from "../types";

export const useReportDatas = (reportGroup: string) => {
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await getReportDatas(reportGroup);
        setReports(data);
      } catch (error) {
        console.error("보고서 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [reportGroup]);

  return { reports, loading };
};
