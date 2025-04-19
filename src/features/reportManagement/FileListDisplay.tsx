import { FileList, FileItem, CancelIcon } from "../../features/notices/styles";
import cancelIcon from "../../img/cancel.png";

interface FileListDisplayProps {
  files: File[];
  onRemove: (index: number) => void;
}

const formatFileName = (file: File) =>
  file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name;

export const FileListDisplay = ({ files, onRemove }: FileListDisplayProps) => (
  <FileList>
    {files.map((file, index) => (
      <FileItem key={index}>
        <span>{formatFileName(file)}</span>
        <CancelIcon
          src={cancelIcon}
          alt="삭제"
          onClick={() => onRemove(index)}
        />
      </FileItem>
    ))}
  </FileList>
);
