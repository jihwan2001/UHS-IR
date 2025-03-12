import { useEffect, useState, useCallback } from "react";
import { NoticesHeader } from "./NoticesHeader";
import { NoticesRow } from "./NoticesRow";
import { TableContainer, StyledTable } from "./styles";
import { useNavigate } from "react-router-dom";
import { NoticesTableProps, NoticeItem } from "./model";
import axios from "axios";

export const NoticesTable = ({
  isAllChecked,
  setIsAnyChecked,
  setSelectedNotices, // ✅ 수정된 타입 적용
}: NoticesTableProps) => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [sortType, setSortType] = useState("latest");
  const navigate = useNavigate();

  const fetchNotices = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/board/list?sortType=${sortType}`
      );

      console.log("📌 API 응답 데이터:", response.data);

      if (response.data && Array.isArray(response.data.content)) {
        const formattedNotices = response.data.content.map(
          (item: NoticeItem) => ({
            ...item,
            isPinned: item.isPinned === true || Number(item.isPinned) === 1, // 🔹 숫자 변환 후 비교
          })
        );

        console.log("📌 변환된 Notices 데이터:", formattedNotices);
        setNotices(formattedNotices);
      } else {
        console.error("📌 API 응답이 예상과 다름:", response.data);
        setNotices([]);
      }
    } catch (error) {
      console.error("공지사항 목록 불러오기 오류:", error);
      setNotices([]);
    }
  }, [sortType]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  // ✅ 체크박스 변경 핸들러 수정
  const handleCheckboxChange = (notice: NoticeItem) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [notice.boardId]: !prev[notice.boardId] };

      // ✅ 선택된 공지 객체 업데이트
      const selectedNotices = Object.keys(updated)
        .filter((key) => updated[Number(key)])
        .map((key) => {
          const foundNotice = notices.find((n) => n.boardId === Number(key));
          return foundNotice
            ? { id: foundNotice.boardId, isPinned: foundNotice.isPinned }
            : null;
        })
        .filter((item) => item !== null);

      setSelectedNotices(
        selectedNotices as { id: number; isPinned: boolean }[]
      );
      setIsAnyChecked(selectedNotices.length > 0);

      return updated;
    });
  };

  const handleRowClick = (item: NoticeItem) => {
    navigate(`/datacenter/13/detail/${item.boardId}`, { state: item }); // ✅ 동적 경로 수정 흐음음
  };

  return (
    <TableContainer>
      <StyledTable>
        <NoticesHeader />
        <tbody>
          {Array.isArray(notices) && notices.length > 0 ? (
            notices.map((item) => (
              <NoticesRow
                key={item.boardId}
                item={item}
                isChecked={checkedItems[item.boardId] || false}
                onCheckboxChange={() => handleCheckboxChange(item)} // ✅ NoticeItem을 전달하여 상태 반영
                onRowClick={() => handleRowClick(item)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                공지사항이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
