import { useNavigate } from "react-router-dom";
import { TableContainer, StyledTable } from "../notices/styles";
import { InquiryHeader } from "./InquiryHeader";
import { InquiryRow } from "./InquiryRow";
import { ComplainItem } from "./model";
import { useEffect, useState } from "react";

interface InquiryTableProps {
  data: ComplainItem[];
}

export const InquiryTable = ({ data }: InquiryTableProps) => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<ComplainItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      setInquiries(data);
      setError(null);
    } catch (err: any) {
      setError("데이터 로딩 중 오류 발생");
    } finally {
      setLoading(false);
    }
  }, [data]);

  const handleRowClick = (item: ComplainItem) => {
    if (item.complainState === "처리됨") {
      navigate(`/datacenter/6/clearPage`, { state: item });
    } else {
      navigate(`/datacenter/6/unClearPage`, { state: item });
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

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
