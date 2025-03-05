import { InputProps } from "../model";
import { StyledTextArea } from "../styles";

export const FormContents = ({
  name,
  value,
  onChange,
  placeholder,
}: InputProps) => {
  return (
    <StyledTextArea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
