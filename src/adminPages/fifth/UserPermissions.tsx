import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  background-color: #fff;
`;

const CheckBox = styled.div`
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  margin-bottom: 20px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #888;
  }
`;

const ButtonGroup = styled.div<{ align?: string }>`
  display: flex;
  gap: 10px;
  justify-content: ${(props) => props.align || "center"};
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:last-child {
    background-color: #ccc;
    color: #333;
    &:hover {
      background-color: #b3b3b3;
    }
  }
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin: 20px 0;
  text-align: center;
`;

const InfoDetails = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: bold;
  color: #333;

  &:nth-last-child(2),
  &:last-child {
    flex: 2;
  }
`;

const ContentDetails = styled.div`
  flex: 1;
  font-size: 14px;

  &:nth-last-child(2),
  &:last-child {
    flex: 2;
  }
`;

interface ReqDatas {
  user_id: number | string;
  user_pw: string;
}

interface AccDatas {
  user_id: number;
  user_account: string;
  user_name: string;
  user_level: number;
  user_memo: string;
  user_position: number;
  user_dept: number;
}

const UserPermissions = () => {
  const [formData, setFormData] = useState<ReqDatas>({
    user_id: "",
    user_pw: "",
  });
  const [checkPw, setCheckPw] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [okPw, setOkPw] = useState("");
  const [accountData, setAccountData] = useState<AccDatas[]>([]); // 사용자 리스트 저장

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOkPw(e.target.value);
  };

  // accountRequired post
  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:8080/api/admin/required",
        {
          user_id: formData.user_id,
          user_pw: okPw,
        }
      );

      if (response.status === 200) {
        setCheckPw(false);
        setShowDetails(true);
      } else {
        alert("비밀번호 확인에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert("사용자를 찾을 수 없습니다.");
        } else {
          console.error("서버 오류:", error.message);
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        console.error("알 수 없는 오류 발생:", error);
        alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 임의 데이터 추가
  const dummyData: AccDatas[] = [
    {
      user_id: 1,
      user_account: "example1@example.com",
      user_name: "홍길동",
      user_level: 1,
      user_memo: "테스트 사용자",
      user_position: 2,
      user_dept: 3,
    },
    {
      user_id: 2,
      user_account: "example2@example.com",
      user_name: "김철수",
      user_level: 2,
      user_memo: "일반 직원",
      user_position: 3,
      user_dept: 4,
    },
  ];

  // accountList get
  useEffect(() => {
    // 주석 처리된 서버 데이터 호출 대신 더미 데이터를 설정
    // const fetchAccountList = async () => {
    //   try {
    //     const response = await axios.get("https://localhost:8080/api/account/list");
    //     console.log("사용자 리스트 불러오기 성공:", response.data);
    //     setAccountData(response.data);
    //   } catch (error) {
    //     console.error("사용자 리스트 불러오기 실패:", error);
    //   }
    // };

    // fetchAccountList();
    setAccountData(dummyData); // 더미 데이터 사용
  }, []);

  // accountUpdate post
  const handleSave = async () => {
    try {
      const updatedData = accountData
        .map((account) => {
          const changes: any = {};

          // 모든 필드 비교
          const original = dummyData.find(
            (item) => item.user_id === account.user_id
          );
          if (original) {
            if (original.user_account !== account.user_account) {
              changes.user_account = account.user_account;
            }
            if (original.user_memo !== account.user_memo) {
              changes.user_memo = account.user_memo;
            }
            if (original.user_level !== account.user_level) {
              changes.user_level = account.user_level;
            }
            if (original.user_position !== account.user_position) {
              changes.user_position = account.user_position;
            }
            if (original.user_dept !== account.user_dept) {
              changes.user_dept = account.user_dept;
            }
          }

          if (Object.keys(changes).length > 0) {
            return { user_id: account.user_id, ...changes };
          }

          return null;
        })
        .filter((item) => item !== null);

      if (updatedData.length > 0) {
        const response = await axios.post(
          "https://localhost:8080/api/account/update",
          updatedData
        );
        console.log("업데이트 성공:", response.data);
        alert("업데이트 성공");
      } else {
        console.log("변경된 데이터가 없습니다.");
        alert("변경된 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("업데이트 실패:", error);
      alert("업데이트 실패");
    }
  };

  return (
    <>
      {/* {checkPw && (
        <Container>
          <CheckBox>
            <Title>
              보안을 위해 한 번 더<br />
              비밀번호를 입력해주세요.
            </Title>
            <Input
              type="password"
              value={okPw}
              placeholder="비밀번호를 입력해주세요."
              onChange={handlePasswordChange}
            />
            <ButtonGroup align="center">
              <Button type="button" onClick={handlePasswordSubmit}>
                확인
              </Button>
              <Button type="button" onClick={() => setOkPw("")}>취소</Button>
            </ButtonGroup>
          </CheckBox>
        </Container>
      )} */}

      {!showDetails && (
        <>
          <RowContainer>
            <InfoDetails>이름</InfoDetails>
            <InfoDetails>보안등급</InfoDetails>
            <InfoDetails>부서</InfoDetails>
            <InfoDetails>직책</InfoDetails>
            <InfoDetails>이메일</InfoDetails>
            <InfoDetails>특이사항</InfoDetails>
          </RowContainer>
          {accountData.map((account, index) => (
            <RowContainer key={account.user_id}>
              <ContentDetails>{account.user_name}</ContentDetails>
              <ContentDetails>
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
              </ContentDetails>
              <ContentDetails>
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
              </ContentDetails>
              <ContentDetails>
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
              </ContentDetails>
              <ContentDetails>
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
              </ContentDetails>
              <ContentDetails>
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
              </ContentDetails>
            </RowContainer>
          ))}
          <ButtonGroup align="flex-end">
            <Button type="button" onClick={handleSave}>
              저장
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  );
};

export default UserPermissions;
