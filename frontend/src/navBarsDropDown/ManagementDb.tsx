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

function ManagementDb() {
  return (
    <div>
      <Ul>
        <Link to={"/managementDb/scholarship"}>
          <li>학부 장학금 지급률</li>
        </Link>
      </Ul>
    </div>
  );
}

export default ManagementDb;
