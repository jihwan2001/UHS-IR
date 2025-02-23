import styled from "styled-components";

export const Container = styled.div`
  /* width: 500px; */
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: navy;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkblue;
  }
`;

export const FAQItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;
`;

export const Question = styled.div`
  background: #f8f8f8;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
export const Answer = styled.div<{ $isOpen: boolean }>`
  padding: 15px;
  font-size: 18px;
  line-height: 1.3;
  color: #333333;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;
