import { useState } from "react";
import {
  NoticesBulkActionBar,
  NoticesAddBtn,
  NoticesTable,
  SearchBar,
} from "../../features";
import { Line, SortDropdown } from "../../shared";
import { Header, HeaderLeft, HeaderRight, NoticeContainer } from "./styles";
import { useNoticesDelete } from "./hooks/NoticesDeleteHooks";
import { useNoticePin } from "./hooks/NoticesPinHooks";
import { useNoticesFetch } from "./hooks/NoticesBoardHooks";

export const NoticesMain = () => {
  const { notices, fetchNotices, loading } = useNoticesFetch(); // ✅ 공지사항 목록 가져오기
  const { selectedNotices, setSelectedNotices, handleDelete } =
    useNoticesDelete();
  const { handlePinToggle } = useNoticePin(fetchNotices); // ✅ fetchNotices 전달

  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleSortChange = (sort: number) => {
    console.log("선택된 정렬 옵션:", sort);
  };

  const handleSelectAll = () => {
    setIsAllChecked((prev) => !prev);
  };

  return (
    <NoticeContainer>
      <Header>
        <HeaderLeft>
          <NoticesAddBtn />
          <Line heightSize={22} />
          <NoticesBulkActionBar
            isAnyChecked={isAnyChecked}
            onSelectAll={handleSelectAll}
            onDelete={handleDelete}
            onPin={() => handlePinToggle(selectedNotices)}
          />
          <Line heightSize={22} />
          <SortDropdown
            sortOptions={["최신 순", "오래된 순", "고정된 것만"]}
            onSortChange={handleSortChange}
          />
        </HeaderLeft>
        <HeaderRight>
          <SearchBar />
        </HeaderRight>
      </Header>

      <NoticesTable
        isAllChecked={isAllChecked}
        setIsAnyChecked={setIsAnyChecked}
        setSelectedNotices={setSelectedNotices}
      />
    </NoticeContainer>
  );
};
