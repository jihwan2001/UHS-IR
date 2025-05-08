import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NoticesHeader } from "./NoticesHeader";
import { NoticesRow } from "./NoticesRow";
import { TableContainer, StyledTable } from "./styles";
import { NoticesTableProps, NoticeItem } from "./model";

export const NoticesTable = ({
  notices, // 공지사항 데이터 배열
  isAllChecked, // 전체 선택 상태
  setIsAnyChecked, // 일부 선택 여부 설정 함수
  setSelectedNotices, // 선택된 공지사항 ID 배열 설정 함수
}: NoticesTableProps) => {
  const navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  // ✅ 개별 체크박스 클릭 시 실행
  const handleCheckboxChange = (notice: NoticeItem) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [notice.boardId]: !prev[notice.boardId] };

      // 선택된 항목만 추출
      const selectedNotices = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map((key) => {
          const found = notices.find((n) => n.boardId === Number(key));
          return found ? { id: found.boardId, isPinned: found.isPinned } : null;
        })
        .filter((item) => item !== null) as { id: number; isPinned: boolean }[];

      setSelectedNotices(selectedNotices);
      setIsAnyChecked(selectedNotices.length > 0);

      return updated;
    });
  };

  useEffect(() => {
    const allChecked = isAllChecked;
    const currentSelectedIds = notices.map((n) => n.boardId);
    const currentStateIds = Object.keys(checkedItems).map(Number);

    // ✅ 현재 상태와 새 상태가 같으면 아무 작업도 하지 않음
    const isSame =
      allChecked &&
      currentStateIds.length === currentSelectedIds.length &&
      currentStateIds.every((id) => currentSelectedIds.includes(id));

    if (isSame) return;

    if (isAllChecked) {
      const newChecked: { [key: number]: boolean } = {};
      notices.forEach((n) => {
        newChecked[n.boardId] = true;
      });
      setCheckedItems(newChecked);
      setSelectedNotices(
        notices.map((n) => ({
          id: n.boardId,
          isPinned: n.isPinned ?? false,
        }))
      );
      setIsAnyChecked(true);
    } else {
      if (Object.keys(checkedItems).length === 0) return; // ✅ 상태가 비어있으면 다시 비울 필요 없음
      setCheckedItems({});
      setSelectedNotices([]);
      setIsAnyChecked(false);
    }
  }, [isAllChecked, notices]);

  const handleRowClick = (item: NoticeItem) => {
    navigate(`/datacenter/7/detail`, { state: item });
  };

  return (
    <TableContainer>
      {notices.length > 0 ? (
        <StyledTable>
          <NoticesHeader />
          <tbody>
            {notices.map((item: NoticeItem) => (
              <NoticesRow
                key={item.boardId}
                item={item}
                isChecked={checkedItems[item.boardId] || false} // ✅ 체크 상태 반영
                onCheckboxChange={() => handleCheckboxChange(item)}
                onRowClick={() => handleRowClick(item)}
              />
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            fontSize: "16px",
            color: "#555",
          }}
        >
          검색 결과가 없습니다.
        </div>
      )}
    </TableContainer>
  );
};
