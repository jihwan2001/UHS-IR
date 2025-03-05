export interface NoticeItem {
  id: number;
  number: string;
  fixed: string;
  title: string;
  author: string;
  date: string;
  views: string;
}
export interface NoticeAddRequest {
  boardTitle: string; // 제목
  boardDescription: string; // 내용
  boardDate: string; // 날짜
  isPinned?: boolean; // 고정 여부 (선택)
  user: string; // 작성자 이름
  fileId?: number; // 첨부파일 ID (선택)
  fileName?: string; // 첨부파일 이름 (선택)
}
