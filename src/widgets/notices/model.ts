// 📂 model.ts

// ✅ 공통 Notice 기본 인터페이스
export interface NoticeBase {
  boardTitle: string; // 제목
  boardDescription: string; // 내용
  boardDate: string; // 작성 날짜
  isPinned?: boolean; // 고정 여부 (선택 사항)
  fileId?: number; // 첨부파일 ID (선택 사항)
  fileName?: string; // 첨부파일 이름 (선택 사항)
  fileSize?: number; // 첨부파일 크기 (선택 사항)
  files?: { fileId: number; fileName: string }[];
}

// ✅ 공지사항 조회 API에서 사용하는 인터페이스
export interface NoticeItem extends NoticeBase {
  boardId: number; // 공지사항 ID
  userId: number; // 작성자 ID
  userName: string; // 작성자 이름
  viewCount: number; // 조회수
}

// ✅ 공지사항 수정 API 요청 데이터 인터페이스
export interface NoticesDetailRequest extends NoticeBase {
  userId: number; // 수정할 작성자 ID (필수)
  fileIds: number[]; // 유지할 파일 ID 목록
  files?: { fileId: number; fileName: string }[];
}

// ✅ 공지사항 추가 API 요청 데이터 인터페이스
export interface NoticesAddRequest extends NoticeBase {
  userName: string; // 작성자 이름
}
