import { useEffect, useState } from "react";
import axios from "axios";

const groupMap: Record<string, string> = {
  "재정 상태 그룹": "재정상태",
  "학생 성과 그룹": "학생성과",
  "교육 역량 그룹": "교육역량",
};

export const useChartData = (aiNavs: string[]) => {
  const [chartData, setChartData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const results: Record<string, any[]> = {};

        for (const label of aiNavs) {
          const groupName = groupMap[label];
          if (!groupName) continue;

          const encoded = encodeURIComponent(groupName);
          const res = await axios.get(
            `http://localhost:8080/api/recharts/group/${encoded}`
          );

          results[label] = res.data; // key: "재정 상태 그룹" 형태로 저장
        }

        setChartData(results);
      } catch (err) {
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [aiNavs.join(",")]);

  return { chartData, loading, error };
};
