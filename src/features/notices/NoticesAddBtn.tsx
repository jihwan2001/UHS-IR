import { useParams, useNavigate } from "react-router-dom";
import { AddBox } from "./styles";

export const NoticesAddBtn = () => {
  const { id } = useParams<{ id: string }>(); // 현재 URL의 id 값 가져오기
  const navigate = useNavigate();

  const handleClick = () => {
    const newPath = id === "7" ? `/datacenter/${id}/add` : `/datacenter/${id}`;
    navigate(newPath); // ✅ id가 7일 때만 "/datacenter/:id/add"로 이동, 아니면 "/datacenter/:id"로 이동
  };

  return <AddBox onClick={handleClick}>공지사항 추가</AddBox>;
};
