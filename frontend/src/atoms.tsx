import { atom } from "recoil";

// IMenu 인터페이스 정의
export interface IMenu {
  id: string;
  text: string;
}

// IMenus 인터페이스 정의
export interface IMenus {
  학생DB: string[];
  교원DB: string[];
  경영DB: string[];
  [key: string]: string[]; // 동적 키 지원
}

// divMenus atom 정의
export const divMenus = atom<IMenus>({
  key: "menus",
  default: {
    학생DB: ["신입생 충원율", "재학생 충원율", "취업률", "중도 탈락률"],
    교원DB: [
      "전임교원의 연구 실적",
      "전임교원 1인당 학생 수 및 전임교원 확보율",
    ],
    경영DB: ["장학금 수혜 현황"],
  },
});
