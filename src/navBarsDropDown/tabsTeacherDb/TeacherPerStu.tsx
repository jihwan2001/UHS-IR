import React from "react";
import {
  Body,
  Line,
  Underline,
  Content,
  Navigation,
  Year,
} from "./TeacherDbNav";
const EmploymentRate = () => {
  return (
    <Body>
      <Navigation />
      <Content>
        <Line>
          전입교원 1인당 학생 수
          <Underline />
        </Line>
        <Year />
      </Content>
    </Body>
  );
};

export default EmploymentRate;
