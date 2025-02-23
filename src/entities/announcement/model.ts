export interface Announcement {
  id: number;
  title: string;
  date: string;
}

// 더미 데이터 (API 호출을 한다면 이 부분을 fetch로 대체 가능)
export const sampleReports: Announcement[] = [
  { id: 124, title: "2024학년도 종합 보고서", date: "2025.01.30" },
  { id: 123, title: "2024학년도 4분기 보고서", date: "2024.12.28" },
  { id: 122, title: "2024학년도 3분기", date: "2024.09.26" },
  { id: 121, title: "2024학년도 2분기", date: "2024.06.25" },
];
