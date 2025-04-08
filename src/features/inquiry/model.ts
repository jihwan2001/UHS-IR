export interface ComplainItem {
  complainId: string; // 번호 (예: "000001")
  complainTitle: string; // 제목
  userName: string; // 문의자 (예: "황윤선")
  userPosition: number;
  complainanType: string; // 문의자 구분 (예: "학생")
  complainDate: string; // 작성일 (예: "2025-02-23")
  complainState: string; // 처리 상태
  processor?: string; // 처리자 (처리됨일 경우 값 있음)
  processedDate?: string; // 처리일 (처리됨일 경우 값 있음)
  complainDescription?: string;
  complainAction?: string;
}