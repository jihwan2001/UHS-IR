import axios from "axios";
import { LoginResponse } from "../model";

export const loginUser = async (
  userAccount: string,
  userPw: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://localhost:8080/api/login/",
      { userAccount, userPw },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data)); // ✅ 유저 정보 저장

    // window.location.href = "/"; // 홈페이지로 이동

    return response.data;   
  } catch (error) {
    let errorMessage = "네트워크 오류가 발생했습니다.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || "로그인 실패";
    }

    throw new Error(errorMessage);
  }
};