import { useEffect, useState } from "react";
import { NoticesHeader } from "./NoticesHeader";
import { NoticesRow } from "./NoticesRow";
import { TableContainer, StyledTable } from "./styles";
import { useNavigate } from "react-router-dom";
import { NoticesTableProps, NoticeItem } from "./model";

export const NoticesTable = ({
  isAllChecked,
  setIsAnyChecked,
  setSelectedIds, // ✅ 추가
}: NoticesTableProps) => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const navigate = useNavigate();

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const selected = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map(Number);
      setSelectedIds(selected); // ✅ 선택된 ID 업데이트
      setIsAnyChecked(selected.length > 0);
      return updated;
    });
  };

  const handleRowClick = (item: NoticeItem) => {
    navigate(`/datacenter/13/detail/${item.id}`, { state: item }); // ✅ 동적 경로 수정
  };

  return (
    <TableContainer>
      <StyledTable>
        <NoticesHeader />
        <tbody>
          {notices.map((item) => (
            <NoticesRow
              key={item.id}
              item={item}
              isChecked={checkedItems[item.id] || false}
              onCheckboxChange={() => handleCheckboxChange(item.id)}
              onRowClick={() => handleRowClick(item)} // ✅ 클릭 시 데이터 전달
            />
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
