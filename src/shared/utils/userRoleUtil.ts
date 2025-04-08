import { useRecoilValue } from "recoil";
import { authState } from "../../authAtom";

export function useUserRole(): string {
  const { userPosition } = useRecoilValue(authState);

  if (userPosition === 0) return "학생";
  if (userPosition === 1) return "교사";
  if (userPosition === 2) return "관리자";
  return "";
}
