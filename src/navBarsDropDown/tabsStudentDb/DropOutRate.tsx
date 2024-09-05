import {
  Body,
  Line,
  Underline,
  Content,
  Navigation,
  Year,
} from "./StudentsDbNav";

const DropOutRate = () => {
  return (
    <Body>
      <Navigation />
      <Content>
        <Line>
          중도탈락률 연도별 추이
          <Underline />
        </Line>
        <Year />
      </Content>
    </Body>
  );
};

export default DropOutRate;
