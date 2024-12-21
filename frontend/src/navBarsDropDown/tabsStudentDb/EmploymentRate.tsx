import {
  Body,
  Line,
  Underline,
  Content,
  Navigation,
  Year,
} from "./StudentsDbNav";
const EmploymentRate = () => {
  return (
    <Body>
      <Navigation />
      <Content>
        <Line>
          졸업생취업률 연도별 추이
          <Underline />
        </Line>
        <Year />
      </Content>
    </Body>
  );
};

export default EmploymentRate;
