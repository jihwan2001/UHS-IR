import { useState } from "react";
import styled from "styled-components";
import ChatBox from "./ChatBox";
import no from "../img/x.png";

const siu =
  "https://cf.channel.io/thumb/200x200/pub-file/130862/67160b344320f6fe670f/9";

// Styled Component 정의
const Box = styled.div<{ clicked: boolean }>`
  background-image: url(${(props) => (props.clicked ? no : siu)});
  background-size: ${(props) => (props.clicked ? "50%" : "cover")};
  background-position: center;
  background-color: white;
  background-repeat: no-repeat;
  height: 56px;
  width: 56px;
  border-radius: 25px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: background-size 0.3s ease, transform 0.3s ease;
  transform: ${(props) => (props.clicked ? "scale(1.1)" : "scale(1)")};

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;

function ChatClickBox() {
  const [boxClicked, setBoxClicked] = useState(false);

  const boxClick = () => {
    setBoxClicked((prev) => !prev);
  };

  return (
    <>
      <Box onClick={boxClick} clicked={boxClicked} />{" "}
      {/* clicked를 Styled Component에 전달 */}
      {boxClicked && <ChatBox isVisible={boxClicked} />} {/* 채팅창 불러오기 */}
    </>
  );
}

export default ChatClickBox;
