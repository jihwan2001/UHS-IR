import axios from "axios";
import { useEffect, useState } from "react";
import { StudentInfoItem } from "../../../features/studentsInfo/model";

export const useStudentsData = () => {
  const [students, setStudents] = useState<StudentInfoItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 선생님 목록을 불러오는 함수
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/account/students`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("학생 목록 불러오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading };
};
