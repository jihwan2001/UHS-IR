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
          전임교원 연구 실적
          <Underline />
        </Line>
        <Year />
      </Content>
    </Body>
  );
};

export default EmploymentRate;
