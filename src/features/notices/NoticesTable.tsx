import { useEffect, useState } from "react";
import { NoticesHeader } from "./NoticesHeader";
import { NoticesRow } from "./NoticesRow";
import { TableContainer, StyledTable } from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NoticesTableProps, NoticeItem } from "./model";

export const NoticesTable = ({
  isAllChecked,
  setIsAnyChecked,
}: NoticesTableProps) => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const navigate = useNavigate();

  // ✅ API 데이터 불러오기
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get<NoticeItem[]>(
          "http://localhost:8080/api/board/list"
        );

        setNotices(response.data); // ✅ API 응답 그대로 저장
      } catch (error) {
        console.error("공지사항 목록 불러오기 오류:", error);
      }
    };

    fetchNotices();
  }, []);

  const handleRowClick = (item: NoticeItem) => {
    navigate(`/datacenter/${item.id}/detail`, { state: item });
  };

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      setIsAnyChecked(Object.values(updated).some((checked) => checked));
      return updated;
    });
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
              onRowClick={() => handleRowClick(item)}
            />
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
