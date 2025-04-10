import React from "react";
import { Box, Title } from "./styles";

interface BusinessBoxProps {
  title: string;
  unit?: string;
  children: React.ReactNode;
}

export const BusinessBox = ({ title, children, unit }: BusinessBoxProps) => {
  return (
    <Box>
      <Title>


        {title}
        {unit && <span>(단위 : {unit})</span>}
      </Title>
      {children}
    </Box>
  );
};
