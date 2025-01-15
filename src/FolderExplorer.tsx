import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface DriveItem {
  fileId: string;
  filename: string;
  mimeType: string;
}

interface FolderExplorerProps {
  initialFolderId: string; // 받아온 폴더 ID
}

const FolderExplorer: React.FC<FolderExplorerProps> = ({ initialFolderId }) => {
  const [currentFolderId, setCurrentFolderId] = useState(initialFolderId);
  const [foldersOnly, setFoldersOnly] = useState(true);

  const [folderData, setFolderData] = useState<DriveItem[]>([]);
  const [fileData, setFileData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetchFolderData();
  }, [currentFolderId, foldersOnly]);

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

  const fetchFileData = async (fileId: string) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`/api/sheets/file`, {
        params: { fileId },
      });
      setFileData(response.data);
      console.log(response.data);
    } catch (err: any) {
      setError("파일 정보를 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenFolder = (folderId: string) => {
    setCurrentFolderId(folderId);
    setFileData(null);
  };

  const toggleFoldersOnly = () => {
    setFoldersOnly(!foldersOnly);
  };

  const renderExcelView = () => {
    if (!fileData) return null;

    const headers = fileData["기준연도"] || [];
    const years = Object.keys(fileData).filter(
      (key) => key !== "기준연도" && key.trim() !== ""
    );

    return (
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              기준연도
            </th>
            {years.map((year) => (
              <th
                key={year}
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {headers.map((header: string, rowIndex: number) => (
            <tr key={rowIndex}>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {header}
              </td>
              {years.map((year) => (
                <td
                  key={year}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "right",
                  }}
                >
                  {fileData[year]?.[rowIndex] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderDefaultView = () => {
    return (
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              공시연도
            </th>
            {Object.keys(fileData)
              .filter((key) => key.trim() !== "공시연도")
              .map((year) => (
                <th
                  key={year}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  {year.trim()}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {fileData["공시연도"]?.map((header: string, rowIndex: number) => (
            <tr key={rowIndex}>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {header}
              </td>
              {Object.keys(fileData)
                .filter((key) => key.trim() !== "공시연도")
                .map((year) => (
                  <td
                    key={year}
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: "right",
                    }}
                  >
                    {fileData[year]?.[rowIndex] || "-"}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Google Drive Explorer</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      {loading && <div>Loading...</div>}

      <div style={{ margin: "10px 0" }}>
        <button onClick={toggleFoldersOnly} disabled={loading}>
          {foldersOnly ? "Show All Files" : "Show Only Folders"}
        </button>
      </div>

      <ul>
        {folderData.map((item) => (
          <li key={item.fileId}>
            {item.mimeType.includes("folder") ? "📁" : "📄"} {item.filename}{" "}
            {item.mimeType.includes("folder") ? (
              <button
                onClick={() => handleOpenFolder(item.fileId)}
                disabled={loading}
              >
                Open
              </button>
            ) : (
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

      {fileData && (
        <div style={{ marginTop: "20px" }}>
          <h4>File Data</h4>
          {location.pathname.startsWith("/teacherDB")
            ? renderExcelView()
            : renderDefaultView()}
        </div>
      )}
    </div>
  );
};

export default FolderExplorer;
