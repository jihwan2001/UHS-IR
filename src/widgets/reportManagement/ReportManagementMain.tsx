import { ExcelUploadForm } from "../../shared/ui/ExcelUploadForm";
import { submitFiles } from "./hooks/useSubmitFiles";

export const ReportManagementMain = () => {
  const handleSubmit = async (files: File[], groupName?: string) => {
    if (!groupName) {
      alert("그룹 이름이 필요합니다.");
      return;
    }
    await submitFiles(files, groupName);
  };

  return <ExcelUploadForm onSubmit={handleSubmit} requireGroupName={true} />;
};
