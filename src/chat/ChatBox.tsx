import React, { useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: whitesmoke;
  border: 1px solid black;
  width: 390.4px;
  height: 524px;
  position: fixed;
  bottom: 90px;
  right: 20px;
  z-index: 1000;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 1;
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  align-self: flex-end;
`;

const Message = styled.div<{ isUserMessage?: boolean }>`
  width: fit-content;
  margin: 5px 0;
  padding: 8px;
  border-radius: 5px;
  background-color: ${(props) => (props.isUserMessage ? "#e0e0e0" : "#d1e7dd")};
  align-self: ${(props) => (props.isUserMessage ? "flex-end" : "flex-start")};
  max-width: 70%;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const DownloadButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px;
  text-align: center;
`;

interface ChatBoxProps {
  isVisible: boolean;
}

function ChatBox({ isVisible }: ChatBoxProps) {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const sendMessage = async () => {
    if (userMessage.trim()) {
      setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
      setErrorMessage("");
      try {
        const response = await fetch("http://localhost:8080/api/chat/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("서버 응답:", data);
        setMessages((prev) => [
          ...prev,
          { text: data.response, isUser: false },
        ]);
      } catch (error) {
        console.error("응답 처리 오류:", error);
        setErrorMessage("메시지 전송 중 오류가 발생했습니다.");
      }
      setUserMessage("");
    }
  };

  const downloadExcel = () => {
    window.open("http://localhost:8080/api/chat/download-excel", "_blank");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box>
      <MessageList>
        {messages.map((msg, index) => (
          <Message key={index} isUserMessage={msg.isUser}>
            {msg.text}
          </Message>
        ))}
      </MessageList>
      <InputContainer>
        <Input
          type="text"
          placeholder="메시지를 입력하세요"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <DownloadButton onClick={downloadExcel}>엑셀 다운로드</DownloadButton>
    </Box>
  );
}

export default ChatBox;
