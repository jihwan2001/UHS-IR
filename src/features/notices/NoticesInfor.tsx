import dateIcon from "../../img/dateIcon.png";
import eyeIcon from "../../img/eyeIcon.png";
import personIcon from "../../img/personIcon.png";
import sharpIcon from "../../img/sharpIcon.png";
import { NoticeItem } from "../../widgets/notices/model";
import { Icon, InfoContainer, InfoItem } from "./styles";

interface NoticesInforProps {
  notice: NoticeItem | null;
}

export const NoticesInfor = ({ notice }: NoticesInforProps) => {
  if (!notice) return null; // notice 데이터가 없을 경우 렌더링 안 함

  return (
    <InfoContainer>
      <InfoItem>
        <Icon src={sharpIcon} alt="id" />
        <span>{notice.boardId}</span> {/* ✅ 기존 number → id로 변경 */}
      </InfoItem>
      <InfoItem>
        <Icon src={personIcon} alt="author" />
        <span>{notice.userName}</span> {/* ✅ user 값 표시 */}
      </InfoItem>
      <InfoItem>
        <Icon src={dateIcon} alt="date" />
        <span>{notice.boardDate}</span> {/* ✅ date → boardDate로 변경 */}
      </InfoItem>
      <InfoItem>
        <Icon src={eyeIcon} alt="views" />
        <span>{notice.viewCount.toLocaleString()}</span>{" "}
        {/* ✅ views → viewCount로 변경 */}
      </InfoItem>
    </InfoContainer>
  );
};
