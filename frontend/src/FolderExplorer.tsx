// FolderExplorer.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

interface DriveItem {
  fileId: string;
  filename: string;
  mimeType: string;
}

const FolderExplorer: React.FC = () => {
  // 기본 루트 폴더 (원하는 폴더 ID로 설정)
  const [currentFolderId, setCurrentFolderId] = useState(
    "1gUgczn8GfH8ioUWqHxFUpzM-3UaBFVwW"
  );
  // 폴더만 보이도록 할지, 모든 파일을 보이도록 할지 설정
  const [foldersOnly, setFoldersOnly] = useState(true);

  // 폴더/파일 목록 저장
  const [folderData, setFolderData] = useState<DriveItem[]>([]);
  // 파일 상세 데이터 저장
  const [fileData, setFileData] = useState<any | null>(null);
  // API 로딩 상태
  const [loading, setLoading] = useState(false);
  // 에러 메시지
  const [error, setError] = useState("");

  // currentFolderId 또는 foldersOnly 값이 바뀔 때마다 호출
  useEffect(() => {
    fetchFolderData();
  }, [currentFolderId, foldersOnly]);

  // 폴더 또는 폴더+파일 목록 가져오기
  const fetchFolderData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`/api/sheets/folderList`, {
        params: { parentFolderId: currentFolderId, foldersOnly },
      });
      setFolderData(response.data);
    } catch (err: any) {
      setError("폴더/파일 목록을 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 특정 파일 상세 정보 가져오기
  const fetchFileData = async (fileId: string) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`/api/sheets/file`, {
        params: { fileId },
      });
      setFileData(response.data);
    } catch (err: any) {
      setError("파일 정보를 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 자식 폴더 열기
  const handleOpenFolder = (folderId: string) => {
    setCurrentFolderId(folderId);
    setFileData(null); // 폴더를 열 때 선택된 파일 정보는 초기화
  };

  // 폴더만 보기 / 전체 보기 토글
  const toggleFoldersOnly = () => {
    setFoldersOnly(!foldersOnly);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Google Drive Explorer</h2>

      {/* 오류 메시지 출력 */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      {/* 현재 요청 상태 */}
      {loading && <div>Loading...</div>}

      <div style={{ margin: "10px 0" }}>
        {/* 폴더만 보기 / 전체 보기 토글 버튼 */}
        <button onClick={toggleFoldersOnly} disabled={loading}>
          {foldersOnly ? "Show All Files" : "Show Only Folders"}
        </button>
      </div>

      {/* 폴더/파일 목록 */}
      <ul>
        {folderData.map((item) => (
          <li key={item.fileId}>
            {item.mimeType.includes("folder") ? "📁" : "📄"} {item.filename}{" "}
            {item.mimeType.includes("folder") ? (
              // 폴더면 "Open" 버튼
              <button
                onClick={() => handleOpenFolder(item.fileId)}
                disabled={loading}
              >
                Open
              </button>
            ) : (
              // 파일이면 "View" 버튼
              <button
                onClick={() => fetchFileData(item.fileId)}
                disabled={loading}
              >
                View
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* 파일 상세 데이터 */}
      {fileData && (
        <div style={{ marginTop: "20px" }}>
          <h4>File Data</h4>
          <pre>{JSON.stringify(fileData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FolderExplorer;
