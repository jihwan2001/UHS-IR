import {
  Body,
  Line,
  Underline,
  Content,
  Navigation,
  Year,
} from "./StudentsDbNav";

const FreshStuRate = () => {
  return (
    <Body>
      <Navigation />
      <Content>
        <Line>
          신입생 충원율 연도별 추이
          <Underline />
        </Line>
        <Year />
      </Content>
    </Body>
  );
};

export default FreshStuRate;
