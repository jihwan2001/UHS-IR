import axios from "axios";
import { useEffect, useState } from "react";
import { TeachersInfoItem } from "../../../features/teachersInfo/model";

export const useTeachersData = () => {
  const [teachers, setTeachers] = useState<TeachersInfoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // 선생님 목록을 불러오는 함수
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/account/teachers`
      );
      setTeachers(response.data);
    } catch (error) {
      console.error("선생님 목록 불러오기 오류:", error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTeachers();
  }, []);

  return { teachers, loading, error };
};
