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

export const NoticesMain = () => {
  const { selectedIds, setSelectedIds, handleDelete } = useNoticesDelete(); // ✅ 삭제 기능 가져오기
  const { handlePinToggle, loading } = useNoticePin(); // ✅ 고정 기능 추가

  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleSortChange = (sort: number) => {
    console.log("선택된 정렬 옵션:", sort);
  };

  const handleSelectAll = () => {
    setIsAllChecked((prev) => !prev);
  };

  return (
    <>
      <NoticeContainer>
        <Header>
          <HeaderLeft>
            <NoticesAddBtn />
            <Line heightSize={22} />
            <NoticesBulkActionBar
              isAnyChecked={isAnyChecked}
              onSelectAll={handleSelectAll}
              onDelete={handleDelete} // ✅ 삭제 기능 연결
              onPin={(isPinned) => handlePinToggle(selectedIds, isPinned)} // ✅ 고정/해제 기능 연결
            />
            <Line heightSize={22} />
            <SortDropdown
              sortOptions={["최신 순", "오래된 순", "고정된 것만"]} // ✅ 3가지 옵션 사용
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
          setSelectedIds={setSelectedIds} // ✅ 선택된 ID 저장
        />
      </NoticeContainer>
    </>
  );
};
