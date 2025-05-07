import { atom } from "recoil";

// 로컬스토리지에서 사용자 정보 가져오기
const storedUser = localStorage.getItem("user");
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: !!parsedUser, // 사용자 정보가 있으면 true, 없으면 false
    userAccount: parsedUser?.userAccount || null,
    username: parsedUser?.userName || null, // 저장된 userName이 있으면 사용
    userPosition: parsedUser?.userPosition || null,
    authLoading: true,
  },
});
