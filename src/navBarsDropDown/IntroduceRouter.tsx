import { Link } from "react-router-dom";
import styled from "styled-components";

// introduce 네비
const Ul = styled.ul`
  li {
    padding: 7px;
    font-weight: lighter;
    &:hover {
      color: #f6ac1d;
    }
  }
`;

function IntroduceRouter() {
  return (
    <div>
      <Ul>
        <Link to={"/introduce/Goal"}>
          <li>목표</li>
        </Link>
        <Link to={"/introduce/organChart"}>
          <li>조직도</li>
        </Link>
        <Link to={"introduce/road"}>
          <li>오시는 길</li>
        </Link>
      </Ul>
    </div>
  );
}

export default IntroduceRouter;
