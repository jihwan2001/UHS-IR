import { useEffect, useState } from "react";
import axios from "axios";

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
        const res = await axios.get(
          `http://localhost:8080/api/openai/analyze`,
          {
            params: { chartKey },
          }
        );

        setAnalysis(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "에러 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [chartKey]);

  return { analysis, loading, error };
};
