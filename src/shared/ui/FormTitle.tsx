import { StyledInput } from "../styles";
import { InputProps } from "../model";

export const FormTitle = ({
  name,
  value,
  onChange,
  placeholder,
}: InputProps) => {
  return (
    <StyledInput
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
