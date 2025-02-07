import axios from "axios";
import { useEffect, useState } from "react";
import UserList from "./UserList";

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
        <PasswordCheck
          okPw={okPw}
          setOkPw={setOkPw}
          handlePasswordChange={handlePasswordChange}
          handlePasswordSubmit={handlePasswordSubmit}
        />
      )} */}
      {!showDetails && (
        <UserList
          accountData={accountData}
          setAccountData={setAccountData}
          handleSave={handleSave}
        />
      )}
    </>
  );
};

export default UserPermissions;
