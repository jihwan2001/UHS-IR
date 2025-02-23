import { Link } from "react-router-dom";
import linkIcon from "../../img/linkIcon.png";
import { AdContainer, Slash } from "./styles";

export const GotoAdminpage = () => {
  return (
    <>
      <Slash>|</Slash>
      <Link to={"/adminPage"}>
        <AdContainer>
          <div>데이터 센터</div> &nbsp;
          <img src={linkIcon} alt="link" />
        </AdContainer>
      </Link>
    </>
  );
};
