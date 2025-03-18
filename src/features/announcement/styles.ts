import styled from "styled-components";

export const SameContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid black;
  border-left: none;
  border-right: none;
`;

export const Container = styled(SameContainer)`
  min-height: 340px;
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    color: #666666;
  }
`;

export const FileContainer = styled(SameContainer)``;
export const FileContents = styled.p`
  margin: 5px 0;
  cursor: pointer;
  &:hover {
    color: #0f2280;
  }
`;

export const BackBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  max-height: 45px;
  padding: 10px;
  margin: 10px 0;
  background-color: #666666;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(75, 75, 75);
  }
`;