import { useNavigate } from "react-router-dom";

import { FormBackBtn, FormContents, FormTitle } from "../../shared";
import {
  FormContainer,
  Label,
  BtnGroup,
  SubmitButton,
} from "../notices/styles";

export const InquiryUnClearForm = () => {
  const handleChange = () => {};
  //미처리된

  return (
    <form>
      <FormContainer>
        <Label>제목</Label>
        <FormTitle
          onChange={handleChange}
          placeholder={"제목을 입력해 주세요"}
        />

        <Label>내용</Label>
        <FormContents
          onChange={handleChange}
          placeholder={"내용을 입력해 주세요"}
        />

        <Label>답변 보내기</Label>
        <FormContents
          onChange={handleChange}
          placeholder={"문의자에게 보낼 답변을 입력해주세요."}
        />
      </FormContainer>

      <BtnGroup>
        <FormBackBtn>목록</FormBackBtn>
        <SubmitButton type="submit">처리</SubmitButton>
      </BtnGroup>
    </form>
  );
};
