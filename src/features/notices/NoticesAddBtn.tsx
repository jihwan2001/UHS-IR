import { useParams, useNavigate } from "react-router-dom";
import { AddBox } from "./styles";

export const NoticesAddBtn = () => {
  const { id } = useParams<{ id: string }>(); // 현재 URL의 id 값 가져오기
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/datacenter/${id}/add`); // ✅ 현재 id를 기반으로 add 페이지로 이동
    }
  };

  return <AddBox onClick={handleClick}>공지사항 추가</AddBox>;
};
