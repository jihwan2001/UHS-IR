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

function SchoolteacherDb() {
  return (
    <div>
      <Ul>
        <Link to={"/teacherDB/Research"}>
          <li>전임교원 연구 실적</li>
        </Link>
        <Link to={"/teacherDB/teacherPerStu"}>
          <li>전임교원 1인당 학생 수</li>
        </Link>
      </Ul>
    </div>
  );
}

export default SchoolteacherDb;
