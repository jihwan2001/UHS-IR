import { PaginationContainer, PageButton } from "./styles";

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  setPageNumber: (page: number) => void;
}

export const Pagination = ({
  pageNumber,
  totalPages,
  setPageNumber,
}: PaginationProps) => {
  // 페이지 목록을 동적으로 생성 (현재 페이지를 중심으로 ±2 페이지씩 표시)
  const getPageNumbers = () => {
    const start = Math.max(1, pageNumber - 2);
    const end = Math.min(totalPages, pageNumber + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <PaginationContainer>
      {/* 처음 페이지 이동 */}
      <PageButton onClick={() => setPageNumber(1)} disabled={pageNumber === 1}>
        {"<<"}
      </PageButton>

      {/* 이전 페이지 이동 */}
      <PageButton
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        {"◀"}
      </PageButton>

      {/* 동적 페이지 번호 버튼 */}
      {getPageNumbers().map((page) => (
        <PageButton
          key={page}
          onClick={() => setPageNumber(page)}
          isActive={page === pageNumber}
        >
          {page}
        </PageButton>
      ))}

      {/* 다음 페이지 이동 */}
      <PageButton
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber === totalPages}
      >
        {"▶"}
      </PageButton>

      {/* 마지막 페이지 이동 */}
      <PageButton
        onClick={() => setPageNumber(totalPages)}
        disabled={pageNumber === totalPages}
      >
        {">>"}
      </PageButton>
    </PaginationContainer>
  );
};
