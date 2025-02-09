import React, { useState } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import Chcss from "./Chcss";

const ChatPage = () => {
  const [messages, setMessages] = useState<
    { text: string; isUser: boolean; isTyping: boolean }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || loading) return; // 로딩 중이면 입력 방지

    const userMessage = { text: input, isUser: true, isTyping: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput("");
    setLoading(true); // API 요청 시작 시 로딩 상태 true

    try {
      const response = await axios.post(
        "http://localhost:8080/api/chat/message",
        {
          message: input,
        }
      );

      const aiResponse = response.data.reply || "서버에서 응답이 없습니다.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, isUser: false, isTyping: true },
      ]);

      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.isTyping ? { ...msg, isTyping: false } : msg
          )
        );
        setLoading(false); // API 응답 후 로딩 상태 false
      }, 1000);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "AI 응답을 가져오는 중 오류가 발생했습니다.",
          isUser: false,
          isTyping: false,
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <Chcss.ChatContainer>
      <Chcss.ChatBox>
        <Chcss.Title>Chat App</Chcss.Title>
        <Chcss.MessagesList>
          {messages.map((message, index) =>
            message.isUser ? (
              <Chcss.UserMessage key={index}>
                <b>User:</b> {message.text}
              </Chcss.UserMessage>
            ) : (
              <Chcss.AiMessage key={index}>
                {message.isTyping ? (
                  <TypeAnimation
                    sequence={[message.text, 1000]}
                    wrapper="p"
                    cursor={false}
                    speed={50}
                  />
                ) : (
                  <p>
                    <b>AI:</b> {message.text}
                  </p>
                )}
              </Chcss.AiMessage>
            )
          )}
        </Chcss.MessagesList>
        <Chcss.MessageForm onSubmit={handleSendMessage}>
          <Chcss.MessageInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={loading ? "AI가 응답 중..." : "메시지를 입력하세요..."}
            disabled={loading}
          />
          <Chcss.SendButton type="submit" disabled={loading}>
            {loading ? "Loading..." : "Send"}
          </Chcss.SendButton>
        </Chcss.MessageForm>
      </Chcss.ChatBox>
    </Chcss.ChatContainer>
  );
};

export default ChatPage;
