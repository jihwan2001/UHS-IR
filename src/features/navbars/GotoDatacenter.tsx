import { Link } from "react-router-dom";
import linkIcon from "../../img/linkIcon.png";
import { AdContainer } from "./styles";
import { Line } from "../../shared";

export const GotoDatacenter = () => {
  return (
    <>
      <Line heightSize={24} />
      <Link to={"/datacenter"}>
        <AdContainer>
          <div>데이터 센터</div> &nbsp;
          <img src={linkIcon} alt="link" />
        </AdContainer>
      </Link>
    </>
  );
};
