import { ExcelUploadForm } from "../../shared/ui/ExcelUploadForm";
import { submitUsersFiles } from "./hooks/submitUsersFiles";

export const PplManagementMain = () => {
  const handleSubmit = async (files: File[]) => {
    await submitUsersFiles(files);
  };

  return <ExcelUploadForm onSubmit={handleSubmit} />;
};
