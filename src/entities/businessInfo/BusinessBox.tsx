import React from "react";
import { Box, Title } from "./styles";

interface BusinessBoxProps {
  title: string;
  children: React.ReactNode;
}

export const BusinessBox = ({ title, children }: BusinessBoxProps) => {
  return (
    <Box>
      <Title>{title}</Title>
      {children}
    </Box>
  );
};
