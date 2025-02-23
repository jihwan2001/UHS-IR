import { CardContainer, Title, Value, SecValue } from "../styles";

interface CardProps {
  title: string;
  value: string;
  secValue: string;
}

export const Card = ({ title, value, secValue }: CardProps) => {
  return (
    <CardContainer>
      <Title>{title}</Title>
      <Value>{value}</Value>
      <SecValue>{secValue}</SecValue>
    </CardContainer>
  );
};
