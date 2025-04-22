import {
  FileList,
  FileItem,
  CancelButton,
} from "../../features/notices/styles";
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
        <CancelButton
          onClick={() => onRemove(index)}
          aria-label={`${file.name} 삭제`}
        >
          <img src={cancelIcon} alt="삭제 아이콘" />
        </CancelButton>
      </FileItem>
    ))}
  </FileList>
);
