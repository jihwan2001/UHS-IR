import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 자식 요소들을 부모 요소의 왼쪽에 배치 */
  justify-content: center; /* 자식 요소들을 수직 중앙에 배치 */
  text-align: left; /* 텍스트를 좌측 정렬 */
  width: auto;
  height: 200px;
  background-color: #0f2280;
  color: white;
  padding-left: 20px; /* 텍스트와 왼쪽 경계 사이에 여백을 추가 */
`;

const Text = styled.p`
  margin: 5px 0; /* 요소 간의 간격을 설정 */
`;

function Footer() {
  return (
    <Container>
      <Text>TEL 031-299-0900</Text>
      <Text>경기도 화성시 봉담읍 최루백로 72 협성대학교(18330)</Text>
      <Text>ⓒCopyright UHS IRCENTER. All rights reserved</Text>
    </Container>
  );
}

export default Footer;
