import { ExcelUploadForm } from "../../shared/ui/ExcelUploadForm";
import { submitUsersFiles } from "../pplManagement/hooks/submitUsersFiles";

export const ReportReportMain = () => {
  const handleSubmit = async (files: File[]) => {
    await submitUsersFiles(files);
    //api수정 필요
  };

  return <ExcelUploadForm onSubmit={handleSubmit} />;
};
