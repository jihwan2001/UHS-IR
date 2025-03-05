import { useState } from "react";
import { BulkActionBar, NoticesAddBtn, NoticesTable } from "../../features";
import { Line, SortDropdown } from "../../shared";
import { Header, NoticeContainer } from "./styles";

export const NoticesMain = () => {
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const handleSortChange = (sort: string) => {
    console.log("선택된 정렬 옵션:", sort);
    // 여기에서 데이터를 정렬하는 로직을 추가할 수 있음
  };
  const handleSelectAll = () => {
    setIsAllChecked((prev) => !prev);
  };

  return (
    <>
      <NoticeContainer>
        <Header>
          <NoticesAddBtn />
          <Line heightSize={22} />
          <BulkActionBar
            isAnyChecked={isAnyChecked}
            onSelectAll={handleSelectAll}
          />
          <Line heightSize={22} />
          <SortDropdown onSortChange={handleSortChange} />
        </Header>
        <NoticesTable
          isAllChecked={isAllChecked}
          setIsAnyChecked={setIsAnyChecked}
        />
      </NoticeContainer>
    </>
  );
};
