import React from "react";
import {
  Button,
  RowContainer,
  InfoDetails,
  ContentDetails,
  ButtonGroup,
} from "./style";
import { AccDatas } from "./types";



interface UserListProps {
  accountData: AccDatas[];
  setAccountData: React.Dispatch<React.SetStateAction<AccDatas[]>>;
  handleSave: () => void;
}

export const UserList: React.FC<UserListProps> = ({
  accountData,
  setAccountData,
  handleSave,
}) => {
  const handleSelectChange = (
    index: number,
    field: keyof AccDatas,
    value: number
  ) => {
    setAccountData((prev) => {
      const updated = [...prev];
      (updated[index][field] as number) = value;
      return updated;
    });
  };

  return (
    <>
      <RowContainer>
        <InfoDetails>이름</InfoDetails>
        <InfoDetails>보안등급</InfoDetails>
        <InfoDetails>부서</InfoDetails>
        <InfoDetails>직책</InfoDetails>
      </RowContainer>

      {accountData.map((account, index) => (
        <RowContainer key={account.userId}>
          <ContentDetails>{account.userName}</ContentDetails>

          <ContentDetails>
            <select
              value={account.userLevel}
              onChange={(e) =>
                handleSelectChange(index, "userLevel", +e.target.value)
              }
            >
              <option value={0}>가</option>
              <option value={1}>나</option>
              <option value={2}>다</option>
              <option value={3}>라</option>
            </select>
          </ContentDetails>

          <ContentDetails>
            <select
              value={account.userDept}
              onChange={(e) =>
                handleSelectChange(index, "userDept", +e.target.value)
              }
            >
              <option value={0}>행정</option>
              <option value={1}>안전</option>
              <option value={2}>시설</option>
              <option value={3}>교육</option>
              <option value={4}>경영</option>
            </select>
          </ContentDetails>

          <ContentDetails>
            <select
              value={account.userPosition}
              onChange={(e) =>
                handleSelectChange(index, "userPosition", +e.target.value)
              }
            >
              <option value={0}>학생</option>
              <option value={1}>교직원</option>
              <option value={2}>관리자</option>
            </select>
          </ContentDetails>
        </RowContainer>
      ))}

      <ButtonGroup align="flex-end">
        <Button onClick={handleSave}>저장</Button>
      </ButtonGroup>
    </>
  );
};