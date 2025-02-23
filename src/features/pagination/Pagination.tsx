import { PaginationContainer, PageButton } from "./styles";

export const Pagination = () => {
  return (
    <PaginationContainer>
      {Array.from({ length: 10 }).map((_, index) => (
        <PageButton key={index}>{index + 1}</PageButton>
      ))}
    </PaginationContainer>
  );
};
