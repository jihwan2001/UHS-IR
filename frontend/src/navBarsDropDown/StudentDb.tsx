import { Link } from "react-router-dom";
import styled from "styled-components";

const Ul = styled.ul`
  li {
    padding: 7px;
    font-weight: lighter;
    &:hover {
      color: #f6ac1d;
    }
  }
`;

function StdentDB() {
  return (
    <div>
      <Ul>
        <Link to={"/studentDb/freshStuRate"}>
          <li>신입생 충원율</li>
        </Link>
        <Link to={"/studentDb/studentsRate"}>
          <li>재학생 충원율</li>
        </Link>
        <Link to={"/studentDb/employmentRate"}>
          <li>취업률</li>
        </Link>
        <Link to={"/studentDb/dropOutRate"}>
          <li>중도탈락률</li>
        </Link>
      </Ul>
    </div>
  );
}

export default StdentDB;
