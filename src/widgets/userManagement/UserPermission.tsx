import { UserList } from "./UserList";
import UserPasswordCheck from "./UserPasswordCheck";
import { usePasswordConfirm } from "./hooks/usePasswordConfirm";
import { useAccountUpdate } from "./hooks/useAccountUpdate";
import { useAccountList } from "./hooks/useAccountList";
import { useRecoilValue } from "recoil";
import { authState } from "../../authAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const UserPermission = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const user_id = auth.userAccount;

  // 🔐 비밀번호 확인 Hook은 무조건 최상단에서 호출
  const {
    okPw,
    setOkPw,
    checkPw,
    showDetails,
    handlePasswordChange,
    userPwSubmit,
  } = usePasswordConfirm({ user_id });

  const { accountData, setAccountData } = useAccountList();
  const { handleSave } = useAccountUpdate(accountData);

  // 🔐 로그인 상태 확인 후 페이지 이동 처리 (useEffect 사용)
  useEffect(() => {
    if (!user_id) {
      alert("로그인이 필요합니다.");
      navigate("/loginPage");
    }
  }, [user_id, navigate]);

  // 🔐 렌더링도 안전하게 처리
  if (!user_id) return null;

  return (
    <>
      {checkPw && (
        <UserPasswordCheck
          okPw={okPw}
          setOkPw={setOkPw}
          handlePasswordChange={handlePasswordChange}
          handlePasswordSubmit={userPwSubmit}
        />
      )}
      {showDetails && (
        <UserList
          accountData={accountData}
          setAccountData={setAccountData}
          handleSave={handleSave}
        />
      )}
    </>
  );
};

export default UserPermission;
