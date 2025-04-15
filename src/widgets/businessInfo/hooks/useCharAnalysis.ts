import { useEffect, useState } from "react";

export interface ChartAnalysis {
  status: string;
  trend: string;
  suggestion: string;
  statusgrade: "좋음" | "나쁨" | "판단불가";
}

export const useChartAnalysis = (chartKey: string) => {
  const [analysis, setAnalysis] = useState<ChartAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch(
          `/api/openai/analyze?chartKey=${encodeURIComponent(chartKey)}`
        );
        if (!res.ok) throw new Error("분석 요청 실패");

        const data: ChartAnalysis = await res.json();
        setAnalysis(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [chartKey]);

  return { analysis, loading, error };
};
