import axios from "axios";
import { AccDatas } from "../types";

export const useAccountUpdate = (accountData: AccDatas[]) => {
  const handleSave = async () => {
    try {
      const response = await axios.post(
        "https://localhost:8080/api/account/update",
        accountData
      );
      alert("업데이트 성공");
      return response.data;
    } catch (error) {
      console.error("업데이트 실패:", error);
      alert("업데이트 실패");
    }
  };

  return { handleSave };
};
