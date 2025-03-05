import lineIcon from "../../img/lineIcon.png";
import { LineImg } from "../styles";

interface LineProps {
  heightSize?: number; // widthSize를 prop으로 받도록 설정
}

export const Line = ({ heightSize = 22 }: LineProps) => {
  return <LineImg src={lineIcon} heightSize={heightSize} />;
};
