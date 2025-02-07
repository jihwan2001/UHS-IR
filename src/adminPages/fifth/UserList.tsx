import React from "react";
import UPcss from "./UPcss";

interface AccDatas {
  user_id: number;
  user_account: string;
  user_name: string;
  user_level: number;
  user_memo: string;
  user_position: number;
  user_dept: number;
}

interface UserListProps {
  accountData: AccDatas[];
  setAccountData: React.Dispatch<React.SetStateAction<AccDatas[]>>;
  handleSave: () => void;
}

const UserList: React.FC<UserListProps> = ({
  accountData,
  setAccountData,
  handleSave,
}) => {
  return (
    <>
      <UPcss.RowContainer>
        <UPcss.InfoDetails>이름</UPcss.InfoDetails>
        <UPcss.InfoDetails>보안등급</UPcss.InfoDetails>
        <UPcss.InfoDetails>부서</UPcss.InfoDetails>
        <UPcss.InfoDetails>직책</UPcss.InfoDetails>
        <UPcss.InfoDetails>이메일</UPcss.InfoDetails>
        <UPcss.InfoDetails>특이사항</UPcss.InfoDetails>
      </UPcss.RowContainer>

      {accountData.map((account, index) => (
        <UPcss.RowContainer key={account.user_id}>
          <UPcss.ContentDetails>{account.user_name}</UPcss.ContentDetails>

          <UPcss.ContentDetails>
            <select
              value={account.user_level}
              onChange={(e) => {
                const newLevel = parseInt(e.target.value, 10);
                setAccountData((prev) => {
                  const updated = [...prev];
                  updated[index].user_level = newLevel;
                  return updated;
                });
              }}
            >
              <option value="0">가</option>
              <option value="1">나</option>
              <option value="2">다</option>
              <option value="3">라</option>
            </select>
          </UPcss.ContentDetails>

          <UPcss.ContentDetails>
            <select
              value={account.user_dept}
              onChange={(e) => {
                const newDept = parseInt(e.target.value, 10);
                setAccountData((prev) => {
                  const updated = [...prev];
                  updated[index].user_dept = newDept;
                  return updated;
                });
              }}
            >
              <option value="0">행정</option>
              <option value="1">안전</option>
              <option value="2">시설</option>
              <option value="3">교육</option>
              <option value="4">경영</option>
            </select>
          </UPcss.ContentDetails>

          <UPcss.ContentDetails>
            <select
              value={account.user_position}
              onChange={(e) => {
                const newPosition = parseInt(e.target.value, 10);
                setAccountData((prev) => {
                  const updated = [...prev];
                  updated[index].user_position = newPosition;
                  return updated;
                });
              }}
            >
              <option value="0">대표</option>
              <option value="1">부서장</option>
              <option value="2">팀장</option>
              <option value="3">파트장</option>
              <option value="4">사원</option>
            </select>
          </UPcss.ContentDetails>

          <UPcss.ContentDetails>
            <input
              type="email"
              value={account.user_account}
              onChange={(e) => {
                const newAccount = e.target.value;
                setAccountData((prev) => {
                  const updated = [...prev];
                  updated[index].user_account = newAccount;
                  return updated;
                });
              }}
            />
          </UPcss.ContentDetails>

          <UPcss.ContentDetails>
            <input
              type="text"
              value={account.user_memo}
              onChange={(e) => {
                const newMemo = e.target.value;
                setAccountData((prev) => {
                  const updated = [...prev];
                  updated[index].user_memo = newMemo;
                  return updated;
                });
              }}
            />
          </UPcss.ContentDetails>
        </UPcss.RowContainer>
      ))}

      <UPcss.ButtonGroup align="flex-end">
        <UPcss.Button type="button" onClick={handleSave}>
          저장
        </UPcss.Button>
      </UPcss.ButtonGroup>
    </>
  );
};

export default UserList;
