import { SearchBar, InquiryBulkActionBar, NoticesTable } from "../../features";
import { InquiryTable } from "../../features/inquiry/InquiryTable";
import { Line, SortDropdown } from "../../shared";
import { Header, HeaderLeft, HeaderRight } from "./styles";

export const InquiryMain = () => {
  const handleSortChange = (sort: number) => {
    console.log("선택된 정렬 옵션:", sort);
  };

  return (
    <>
      <Header>
        <HeaderLeft>
          <InquiryBulkActionBar />
          <Line heightSize={22} />
          <SortDropdown
            sortOptions={["최신 순", "오래된 순"]} // ✅ 최신순 & 오래된 순만 사용
            onSortChange={handleSortChange}
          />
        </HeaderLeft>
        <HeaderRight>
          <SearchBar />
        </HeaderRight>
      </Header>
      <InquiryTable />
    </>
  );
};
