import { useState } from "react";
import { LoginRequest, LoginResponse } from "./model";
import { loginUser } from "./api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const login = async ({
    userAccount,
    userPw,
  }: LoginRequest): Promise<LoginResponse | void> => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await loginUser(userAccount, userPw);
      setMessage(data.message);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, message };
};
