import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.813rem;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #e0e0e0;
  border-radius: 10px;
`;

export const GroupNameBox = ({ children }: { children: React.ReactNode }) => {
  return <Box>{children}</Box>;
};
