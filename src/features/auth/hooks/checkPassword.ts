// checkPassword.ts
import axios from "axios";

export const checkPassword = async (
  userAccount: string,
  userPw: string
): Promise<boolean> => {
  try {
    const response = await axios.post("http://localhost:8080/api/login/", {
      userAccount,
      userPw,
    });

    return response.status === 200; // 성공이면 true
  } catch (error) {
    return false; // 실패하면 false
  }
};
