import {
  Body,
  Line,
  Underline,
  Content,
  Navigation,
  Year,
} from "./StudentsDbNav";

const StudentsRate = () => {
  return (
    <Body>
      <Navigation />
      <Content>
        <Line>
          재학생 충원율 연도별 추이
          <Underline />
        </Line>
        <Year />
      </Content>
    </Body>
  );
};

export default StudentsRate;
