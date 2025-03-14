// 📂 model.ts (또는 NoticesTable.tsx 내부)
export interface SelectedNotice {
  id: number;
  isPinned: boolean;
}

export interface NoticesTableProps {
  notices: NoticeItem[]; // ✅ notices 추가
  isAllChecked: boolean;
  setIsAnyChecked: (checked: boolean) => void;
  setSelectedNotices: (notices: SelectedNotice[]) => void;
  searchQuery?: string;
}
export interface NoticeItem {
  boardId: number;
  boardTitle: string; // 제목
  boardDescription: string; // 내용
  boardDate: string; // 날짜
  isPinned?: boolean; // 고정 여부
  viewCount: number; // 조회수
  user: number; // 작성자 ID
  userName: string;
  fileName?: string; // 첨부파일 이름
  fileSize?: number; // 첨부파일 크기
}
