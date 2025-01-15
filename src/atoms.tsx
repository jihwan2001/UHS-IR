import { atom } from "recoil";

// // IMenu 인터페이스 정의
// export interface IMenu {
//   id: string;
//   text: string;
// }

// // IMenus 인터페이스 정의
// export interface IMenus {
//   학생DB: string[];
//   교원DB: string[];
//   경영DB: string[];
//   [key: string]: string[]; // 동적 키 지원
// }

// // divMenus atom 정의
// export const divMenus = atom<IMenus>({
//   key: "menus",
//   default: {
//     학생DB: ["신입생 충원율", "재학생 충원율", "취업률", "중도탈락률"],
//     교원DB: [
//       "전임교원의 연구 실적",
//       "전임교원 1인당 학생 수 및 전임교원 확보율",
//     ],
//     경영DB: ["장학금 수혜 현황"],
//   },
// });

// Recoil atom으로 메뉴 데이터 관리
export const navMenuState = atom({
  key: "navMenuState", // 고유 키
  default: [
    {
      title: "입학 데이터",
      items: ["합격 및 등록 현황"],
      eng: ["EnrollmentStatus"],
    },
    {
      title: "교육성과 분석",
      items: [
        "학업 성취도 분석",
        "학사 과정 참여",
        "교내외 공모전 대비 성과",
        "학생 경험 및 만족도",
      ],
      eng: [
        "AcademicPerformance",
        "ProgramParticipation",
        "CompetitionResults",
        "StudentExperience",
      ],
    },
    {
      title: "사무 관리",
      items: [
        "공지사항",
        "민원 및 건의관리",
        "학사 스케줄 관리",
        "학사 보고서 관리",
      ],
      eng: [
        "Notices",
        "ComplaintsManagement",
        "ScheduleManagement",
        "ReportManagement",
      ],
    },
    {
      title: "홈페이지 공지 데이터",
      items: ["공지데이터 설정"],
      eng: ["WebsiteNoticeSettings"],
    },
    {
      title: "사용자 권한",
      items: ["사용자 권한 설정"],
      eng: ["UserPermissions"],
    },
  ],
});
