import { StudentInfoItem } from "./model";

// 더미 데이터 배열
export const dummyData: StudentInfoItem[] = [
  {
    userId: 1,
    userName: "김철수",
    userAccount: "kimcs01",
    userLevel: 2,
    userPosition: 1,
    userDept: 101,
    userDepart: "기획부",
    userBirth: "1998-04-10",
    userPhone: "010-1234-5678",
    userAddress: "서울시 강남구",
  },
  {
    userId: 2,
    userName: "이영희",
    userAccount: "leeyh02",
    userLevel: 3,
    userPosition: 2,
    userDept: 102,
    userDepart: "개발팀",
    userBirth: "1997-06-15",
    userPhone: "010-2345-6789",
    userAddress: "부산광역시 해운대구",
  },
  {
    userId: 3,
    userName: "박지훈",
    userAccount: "parkjh03",
    userLevel: null,
    userPosition: null,
    userDept: 103,
    userDepart: "디자인팀",
    userBirth: "1999-12-01",
    userPhone: "010-3456-7890",
    userAddress: "대구광역시 수성구",
  },
];
