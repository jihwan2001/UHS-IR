import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  background-color: #fff;
`;

const CheckBox = styled.div`
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  margin-bottom: 20px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #888;
  }
`;

const ButtonGroup = styled.div<{ align?: string }>`
  display: flex;
  gap: 10px;
  justify-content: ${(props) => props.align || "center"};
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #ff8a8a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #b96868;
  }
  &:last-child {
    background-color: #ccc;
    color: #333;
    &:hover {
      background-color: #b3b3b3;
    }
  }
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin: 20px 0;
  text-align: center;
`;

const InfoDetails = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: bold;
  color: #333;

  &:nth-last-child(2),
  &:last-child {
    flex: 2;
  }
`;

const ContentDetails = styled.div`
  flex: 1;
  font-size: 14px;

  &:nth-last-child(2),
  &:last-child {
    flex: 2;
  }
`;

export default {
  Container,
  CheckBox,
  Title,
  Input,
  ButtonGroup,
  Button,
  RowContainer,
  InfoDetails,
  ContentDetails,
};
