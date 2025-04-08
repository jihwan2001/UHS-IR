// src/features/auth/model.ts
export interface LoginRequest {
  userAccount: string;
  userPw: string;
}

export interface LoginResponse {
  userAccount: number;
  userId: number;
  userName: string;
  message: string;
}
