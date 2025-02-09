import styled from "styled-components";

// Styled Components
const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

const ChatBox = styled.div`
  width: 500px;
  height: 600px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.13);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MessagesList = styled.div`
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
`;

const UserMessage = styled.div`
  align-self: flex-end;
  background: #2979ff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 16px 16px 0 16px;
  margin-bottom: 20px;
  max-width: 80%;
`;

const AiMessage = styled.div`
  align-self: flex-start;
  background: #f0f0f0;
  color: #333;
  padding: 10px 15px;
  border-radius: 16px 16px 16px 0;
  margin-bottom: 20px;
  max-width: 80%;
`;

const MessageForm = styled.form`
  border-top: 1px solid #f0f0f0;
  padding: 20px;
  display: flex;
  align-items: center;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 16px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  border-radius: 16px;
  border: none;
  background-color: #2979ff;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #1e5ad7;
  }
`;

const Title = styled.h1`
  text-align: center;
  background-color: #f5f5f5;
  padding: 20px;
  margin: 0;
`;
export default {
  ChatContainer,
  ChatBox,
  MessagesList,
  UserMessage,
  AiMessage,
  MessageForm,
  MessageInput,
  SendButton,
  Title,
};
