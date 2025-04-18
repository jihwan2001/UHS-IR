import { StyledTh } from "../notices/styles";

const columnWidths = {
  checkbox: "5%",
  userId: "5%",
  userName: "10%",
  userAccount: "12%",
  userLevel: "5%",
  userPosition: "8%",
  userDept: "8%",
  userDepart: "8%",
  userBirth: "12%",
  userPhone: "14%",
  userAddress: "15%",
};

export const TeachersHeader = () => {
  return (
    <thead>
      <tr>
        <StyledTh style={{ width: columnWidths.checkbox }}>구분</StyledTh>
        <StyledTh style={{ width: columnWidths.userId }}>ID</StyledTh>
        <StyledTh style={{ width: columnWidths.userName }}>이름</StyledTh>
        <StyledTh style={{ width: columnWidths.userAccount }}>계정</StyledTh>
        <StyledTh style={{ width: columnWidths.userLevel }}>레벨</StyledTh>
        <StyledTh style={{ width: columnWidths.userPosition }}>직책</StyledTh>
        <StyledTh style={{ width: columnWidths.userDept }}>부서번호</StyledTh>
        <StyledTh style={{ width: columnWidths.userDepart }}>부서명</StyledTh>
        <StyledTh style={{ width: columnWidths.userBirth }}>생년월일</StyledTh>
        <StyledTh style={{ width: columnWidths.userPhone }}>전화번호</StyledTh>
        <StyledTh style={{ width: columnWidths.userAddress }}>주소</StyledTh>
      </tr>
    </thead>
  );
};
