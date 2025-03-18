import { NoticesHeader } from "./NoticesHeader";
import { NoticesRow } from "./NoticesRow";
import { TableContainer, StyledTable } from "./styles";
import { useNavigate } from "react-router-dom";
import { NoticesTableProps, NoticeItem } from "./model";
import { useState, useEffect } from "react"; // ✅ useState 추가


export const NoticesTable = ({
  notices, // ✅ API에서 가져온 데이터 props로 받음
  isAllChecked,
  setIsAnyChecked,
  setSelectedNotices,
}: NoticesTableProps) => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const handleCheckboxChange = (notice: NoticeItem) => {
    setCheckedItems((prev: { [key: number]: boolean }) => { // ✅ prev 타입 명시
      const updated = { ...prev, [notice.boardId]: !prev[notice.boardId] };
  
      const selectedNotices = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map((key) => {
          const foundNotice = notices.find((n) => n.boardId === Number(key));
          return foundNotice
            ? { id: foundNotice.boardId, isPinned: foundNotice.isPinned }
            : null;
        })
        .filter((item) => item !== null);

      setSelectedNotices(selectedNotices as { id: number; isPinned: boolean }[]);
      setIsAnyChecked(selectedNotices.length > 0);

      return updated;
    });
  };

  const handleRowClick = (item: NoticeItem) => {
    navigate(`/datacenter/13/detail`, { state: item });
  };

  useEffect(() => {
    console.log("📌 NoticesTable에 전달된 notices:", notices);
  }, [notices]);

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
                isChecked={checkedItems[item.boardId] || false} // ✅ 체크된 상태 반영
                onCheckboxChange={() => handleCheckboxChange(item)}
                onRowClick={()=>handleRowClick(item)}
                />
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <div style={{ textAlign: "center", padding: "20px", fontSize: "16px", color: "#555" }}>
          검색 결과가 없습니다.
        </div>
      )}
    </TableContainer>
  );
};
