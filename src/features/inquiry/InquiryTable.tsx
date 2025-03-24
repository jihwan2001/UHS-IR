import { useNavigate } from "react-router-dom";
import { TableContainer, StyledTable } from "../notices/styles";
import { InquiryHeader } from "./InquiryHeader";
import { InquiryRow } from "./InquiryRow";
import { ComplainItem } from "./model";
import { useInquiries } from "./hooks/useInquiries";

export const InquiryTable = () => {
  const { inquiries, loading, error } = useInquiries(); // ✅ 커스텀 훅 사용
  const navigate = useNavigate();

  const handleRowClick = (item: ComplainItem) => {
    if (item.complainState === "처리됨") {
      navigate(`/clearPage`, { state: item });
    } else {
      navigate(`/unClearPage`, { state: item });
    }
  };

  if (loading) return <p>로딩 중...</p>; // ✅ 로딩 상태 표시
  if (error) return <p>{error}</p>; // ✅ 에러 발생 시 메시지 표시

  return (
    <TableContainer>
      <StyledTable>
        <InquiryHeader />
        <tbody>
          {inquiries.map((inquiry) => (
            <InquiryRow
              key={inquiry.complainId}
              data={inquiry}
              onRowClick={() => handleRowClick(inquiry)}
            />
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};