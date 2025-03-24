// src/features/auth/model.ts
export interface LoginRequest {
  userAccount: string;
  userPw: string;
}

export interface LoginResponse {
  userName: string;
  message: string;
}
