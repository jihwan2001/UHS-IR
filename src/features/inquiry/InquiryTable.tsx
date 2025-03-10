import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableContainer, StyledTable } from "../notices/styles";
import { InquiryHeader } from "./InquiryHeader";
import { InquiryRow } from "./InquiryRow";

export const InquiryTable = () => {
  const [notices, setNotices] = useState<[]>([]);

  const navigate = useNavigate();

  //   const handleRowClick = () => {
  //     navigate(`/datacenter/14/detail/${item.id}`, { state: item }); // ✅ 동적 경로 수정
  //   };

  return (
    <TableContainer>
      <StyledTable>
        <InquiryHeader />
        <tbody>
          <InquiryRow
            onRowClick={() => {}} // ✅ 클릭 시 데이터 전달
          />
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
