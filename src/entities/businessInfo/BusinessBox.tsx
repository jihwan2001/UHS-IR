// BusinessBox.tsx
import styled from "styled-components";
import React from "react";

const Box = styled.div`
  background-color: #fff;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  height: 250px;
  width: 50%;
  min-width: 280px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface BusinessBoxProps {
  title: string;
  children: React.ReactNode;
}

export const BusinessBox = ({ title, children }: BusinessBoxProps) => {
  return (
    <Box>
      <h3 style={{ textAlign: "center", marginBottom: "12px" }}>{title}</h3>
      {children}
    </Box>
  );
};
