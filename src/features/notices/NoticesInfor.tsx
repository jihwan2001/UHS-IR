import styled from "styled-components";
import dateIcon from "../../img/dateIcon.png";
import eyeIcon from "../../img/eyeIcon.png";
import personIcon from "../../img/personIcon.png";
import sharpIcon from "../../img/sharpIcon.png";
import { NoticeItem } from "../../widgets/notices/model";

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.125rem;
  color: #333;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Icon = styled.img`
  width: 1.125rem;
  height: 1.125rem;
`;

interface NoticesInforProps {
  notice: NoticeItem | null;
}

export const NoticesInfor = ({ notice }: NoticesInforProps) => {
  if (!notice) return null; // notice 데이터가 없을 경우 렌더링 안 함

  return (
    <InfoContainer>
      <InfoItem>
        <Icon src={sharpIcon} alt="sharp" />
        <span>{notice.number}</span>
      </InfoItem>
      <InfoItem>
        <Icon src={personIcon} alt="author" />
        <span>{notice.author}</span>
      </InfoItem>
      <InfoItem>
        <Icon src={dateIcon} alt="date" />
        <span>{notice.date}</span>
      </InfoItem>
      <InfoItem>
        <Icon src={eyeIcon} alt="views" />
        <span>{notice.views}</span>
      </InfoItem>
    </InfoContainer>
  );
};
