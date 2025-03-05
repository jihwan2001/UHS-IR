export interface NoticesTableProps {
  isAllChecked: boolean;
  setIsAnyChecked: (checked: boolean) => void;
}

export interface NoticeBase {
  boardTitle: string; // 제목
  boardDescription: string; // 내용
  boardDate: string; // 작성 날짜
  isPinned?: boolean; // 고정 여부 (선택 사항)
  user: string; // 작성자 이름
  fileId?: number; // 첨부파일 ID (선택 사항)
  fileName?: string; // 첨부파일 이름 (선택 사항)
  fileSize?: number; // 첨부파일 크기 (선택 사항)
}

// ✅ 공지사항 조회 시 사용되는 데이터 (API에서 받아오는 데이터)
export interface NoticeItem extends NoticeBase {
  id: number; // 공지사항 ID
  viewCount: number; // 조회수
}

// ✅ 공지사항 추가 시 사용하는 데이터 (새로운 글 작성 시)
export interface NoticeAddRequest extends NoticeBase {}
