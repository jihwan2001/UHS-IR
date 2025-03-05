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

// export interface NoticeItem {
//   id: number; // 공지사항 ID
//   boardTitle: string; // 제목
//   boardDescription: string; // 내용
//   boardDate: string; // 날짜
//   isPinned?: boolean; // 고정 여부 (선택 사항)
//   viewCount: number; // 조회수
//   user: string; // 작성자 이름
//   fileId?: number; // 첨부파일 ID (선택 사항)
//   fileName?: string; // 첨부파일 이름 (선택 사항)
// }
