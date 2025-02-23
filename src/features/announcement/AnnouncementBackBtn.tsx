import listIcon from "../../img/listIcon.png";
import { BackBtn } from "./styles";

interface BackButtonProps {
  onClick: () => void;
}

export const AnnouncementBackBtn = ({ onClick }: BackButtonProps) => {
  return (
    <BackBtn onClick={onClick}>
      <img src={listIcon} alt="go" />
      <p>목록</p>
    </BackBtn>
  );
};
