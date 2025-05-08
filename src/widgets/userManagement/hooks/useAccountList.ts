// hooks/useAccountList.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { AccDatas } from "../types";

export const useAccountList = () => {
  const [accountData, setAccountData] = useState<AccDatas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/account/list/admin"
        );
        setAccountData(response.data);
      } catch (error) {
        console.error("사용자 리스트 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountList();
  }, []);

  return { accountData, setAccountData, loading };
};
