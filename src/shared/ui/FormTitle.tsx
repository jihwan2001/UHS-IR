import { StyledInput } from "../styles";

export const FormTitle = ({ placeholder }: { placeholder: string }) => {
  return <StyledInput type="text" placeholder={placeholder} />;
};
