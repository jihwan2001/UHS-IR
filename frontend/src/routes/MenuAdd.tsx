import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { divMenus } from "../atoms";

const Form = styled.form`
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  width: 500px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 400px;
  height: 30px;
  margin-bottom: 20px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  width: 90px;
  height: 30px;
  background-color: #0f2280;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    background-color: #0d1b65;
  }
`;

const CancelButton = styled(Button)`
  background-color: #c42505;

  &:hover {
    background-color: #a32000;
  }
`;

interface IMenuAddProps {
  setAdd: (value: boolean) => void;
  id: string;
}

function MenuAdd({ setAdd, id }: IMenuAddProps) {
  const [menus, setMenus] = useRecoilState(divMenus);
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ categoryName: string }>();

  const onSubmit = (data: { categoryName: string }) => {
    const categoryName = data.categoryName.trim();
    if (id === "IR Center") {
      setMenus((prev) => {
        return {
          ...prev,
          [categoryName]: [],
        };
      });
      reset();
      setAdd(false);
    } else if (categoryName) {
      setMenus((prev) => {
        if (prev[id]) {
          if (prev[id].includes(categoryName)) {
            alert("이미 존재합니다.");
            return prev;
          }
          return {
            ...prev,
            [id]: [...prev[id], categoryName],
          };
        }
        return prev;
      });
      reset();
      setAdd(false);
    } else {
      alert("값을 입력하세요");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder={id === "IR Center" ? "분류명 입력" : "데이터 파일명 입력"}
        {...register("categoryName", { required: true })}
      />
      {errors.categoryName && (
        <span style={{ color: "red" }}>
          {id === "IR Center"
            ? "분류명을 입력해주세요."
            : "데이터 파일명을 입력해주세요"}
        </span>
      )}
      <ButtonContainer>
        <Button type="submit">확인</Button>
        <CancelButton
          type="button"
          onClick={() => {
            setAdd(false);
          }}
        >
          취소
        </CancelButton>
      </ButtonContainer>
    </Form>
  );
}

export default MenuAdd;
