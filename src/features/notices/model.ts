export interface NoticesTableProps {
  isAllChecked: boolean;
  setIsAnyChecked: (checked: boolean) => void;
}
export interface NoticeItem {
  id: number;
  boardTitle: string; // 제목
  boardDescription: string; // 내용
  boardDate: string; // 날짜
  isPinned?: boolean; // 고정 여부
  viewCount: number; // 조회수
  user: number; // 작성자 ID
  fileName?: string; // 첨부파일 이름
  fileSize?: number; // 첨부파일 크기
}
