import dateIcon from "../../img/dateIcon.png";
import personIcon from "../../img/personIcon.png";
import sharpIcon from "../../img/sharpIcon.png";
import { InfoContainer, InfoItem, Icon } from "../notices/styles";
import { ComplainItem } from "./model";

interface InquiryInfoProps {
  inquiry: ComplainItem | null;
}

export const InquiryInfor = ({ inquiry }: InquiryInfoProps) => {
  if (!inquiry) return null; // ✅ inquiry 데이터가 없을 경우 렌더링 안 함

  return (
    <InfoContainer>
      <InfoItem>
        <Icon src={sharpIcon} alt="id" />
        <span>{inquiry.complainId}</span> {/* ✅ complainId 사용 */}
      </InfoItem>

      {inquiry.userName && (
        <InfoItem>
          <Icon src={personIcon} alt="author" />
          <span>{inquiry.userName}</span> {/* ✅ userName 사용 */}
        </InfoItem>
      )}

      <InfoItem>
        <Icon src={dateIcon} alt="date" />
        <span>{inquiry.complainDate}</span> {/* ✅ complainDate 사용 */}
      </InfoItem>
    </InfoContainer>
  );
};