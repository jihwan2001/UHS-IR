import styled from "styled-components";

// UI 스타일 정의
const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #333;
  margin-bottom: 20px;
`;

const Info = styled.div`
  font-size: 14px;
  color: #666;
`;

const Status = styled.div`
  font-size: 14px;
  color: #007bff;
  text-align: right;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
  margin: 10px 0;
`;

const ActionContainer = styled.div`
  border-radius: 8px;
`;

const ActionContent = styled.div`
  font-size: 16px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button<{ state?: string }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: ${({ state }) =>
    state === "대기중" ? "#007bff" : "#6c757d"};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ state }) =>
      state === "대기중" ? "#0056b3" : "#5a6268"};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 10px;
  resize: none;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const DeletePopUp = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 10px;
  width: 450px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 100;
  background-color: #fff;
`;

const CMHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const InfoContainer = styled.div`
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  padding: 15px;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const InfoTitle = styled.div`
  flex: 4;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const InfoDetails = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
`;

const ContentsContainer = styled.div`
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ContentTitle = styled.div`
  flex: 4;
  font-size: 16px;
`;

const ContentDetails = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
`;

const ContentDate = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 5px 10px;
  border: none;
  background-color: ${({ $active }) => ($active ? "#007bff" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#007bff")};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
  &:disabled {
    background-color: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }
`;

export default {
  Container,
  Header,
  TitleSection,
  Title,
  Info,
  Status,
  Content,
  ActionContainer,
  ActionContent,
  ButtonGroup,
  Button,
  TextArea,
  Overlay,
  DeletePopUp,
  CMHeader,
  Select,
  InfoContainer,
  InfoTitle,
  InfoDetails,
  ContentsContainer,
  ContentTitle,
  ContentDetails,
  ContentDate,
  Pagination,
  PageButton,
};
