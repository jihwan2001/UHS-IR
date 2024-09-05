import { Body, Line, Underline, Content, Navigation } from "./IntroduceNav";

function Goal() {
  return (
    <Body>
      <Navigation />
      <Content>
        <Line>
          목표
          <Underline />
        </Line>
        <div>목표 내용ss</div>
      </Content>
    </Body>
  );
}

export default Goal;
