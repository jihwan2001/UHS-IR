import {
  Body,
  Line,
  Underline,
  Content,
  Navigation,
  Year,
} from "./ManagementNav";

function Goal() {
  return (
    <Body>
      <Navigation />
      <Content>
        <Line>
          장학금 수혜 현황
          <Underline />
        </Line>
        <Year />
      </Content>
    </Body>
  );
}

export default Goal;
