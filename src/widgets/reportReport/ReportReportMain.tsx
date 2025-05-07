import { ExcelUploadForm } from "../../shared/ui/ExcelUploadForm";
import { submitUsersFiles } from "../pplManagement/hooks/submitUsersFiles";

export const ReportReportMain = () => {
  const handleSubmit = async (files: File[]) => {
    //api수정 필요 보내줘보내줘
  };

  return <ExcelUploadForm onSubmit={handleSubmit} />;
};
