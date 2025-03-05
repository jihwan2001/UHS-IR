import { useEffect, useState } from "react";
import { NoticesHeader } from "./NoticesHeader";
import { NoticesRow } from "./NoticesRow";
import { TableContainer, StyledTable } from "./styles";
import { useNavigate, useParams } from "react-router-dom";

const data = [
  {
    id: 1,
    number: "000001",
    fixed: "X",
    title:
      "공지사항 제목 123123 공지사항 제목이 길어질 경우 말줄임표가 적용됩니다.",
    author: "황을선",
    date: "2025-02-23",
    views: "123,2051",
  },
  {
    id: 2,
    number: "000001",
    fixed: "X",
    title: "공지사항 제목 123123 123123",
    author: "황을선",
    date: "2025-02-23",
    views: "123,2051",
  },
];

interface NoticesTableProps {
  isAllChecked: boolean;
  setIsAnyChecked: (checked: boolean) => void;
}

export const NoticesTable = ({
  isAllChecked,
  setIsAnyChecked,
}: NoticesTableProps) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const { id } = useParams<{ id: string }>(); // 현재 URL의 id 값 가져오기
  const navigate = useNavigate();
  const handleRowClick = () => {
    if (id) {
      navigate(`/datacenter/${id}/detail`); // ✅ 현재 id를 기반으로 add 페이지로 이동
    }
  };

  // 개별 체크박스 선택 핸들러
  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const isAnyChecked = Object.values(updated).some((checked) => checked);
      setIsAnyChecked(isAnyChecked);
      return updated;
    });
  };

  // 전체 선택/해제 핸들러
  useEffect(() => {
    const allChecked = isAllChecked
      ? Object.fromEntries(data.map((item) => [item.id, true]))
      : {};
    setCheckedItems(allChecked);
    setIsAnyChecked(isAllChecked);
  }, [isAllChecked]);

  return (
    <TableContainer>
      <StyledTable>
        <NoticesHeader />
        <tbody>
          {data.map((item) => (
            <NoticesRow
              key={item.id}
              item={item}
              isChecked={checkedItems[item.id] || false}
              onCheckboxChange={() => handleCheckboxChange(item.id)}
              onRowClick={() => handleRowClick()} // 클릭 이벤트 추가
            />
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
