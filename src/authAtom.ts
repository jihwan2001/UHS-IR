import { atom } from "recoil";

// 로컬스토리지에서 사용자 정보 안전하게 가져오기
let parsedUser = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    parsedUser = JSON.parse(storedUser);
  }
} catch (e) {
  console.warn("로컬스토리지 'user' 파싱 실패:", e);
}

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: !!parsedUser,
    userAccount: parsedUser?.userAccount || null,
    username: parsedUser?.userName || null, // 통일된 키 사용
    userPosition: parsedUser?.userPosition || null,
  },
});
