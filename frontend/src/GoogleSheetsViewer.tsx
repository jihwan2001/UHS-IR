import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

interface Sheet {
  id: string;
  name: string;
  mimeType: string;
}

const GoogleSheetsViewer: React.FC = () => {
  const [sheetData, setSheetData] = useState<Array<Array<string>>>([]);
  const [newSheetName, setNewSheetName] = useState("");
  const [newSheetData, setNewSheetData] = useState("");
  const [emails, setEmails] = useState("");
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from Google Sheets
  const fetchSheetData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/sheets");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("Fetched Data:", data);
      setSheetData(data);
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSheets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/sheets`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSheets(data);
      } catch (error) {
        console.error("Error fetching sheets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSheets();
  }, []);

  // Create a new Google Sheet
  const createSheet = async () => {
    try {
      const payload = {
        sheetName: newSheetName,
        dataToBeUpdated: JSON.parse(newSheetData),
        emails: emails.split(",").map((email) => email.trim()),
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/createsheet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      alert(`Sheet created successfully! URL: ${data.spreadSheetUrl}`);
      await fetchSheetData(); // 새로 생성된 시트를 확인하기 위해 데이터 새로 고침
    } catch (error) {
      console.error("Error creating Google Sheet:", error);
      alert("Failed to create Google Sheet.");
    }
  };

  // Download the sheet data as CSV
  const downloadSheet = () => {
    const csvContent = sheetData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sheet-data.csv");
  };

  useEffect(() => {
    fetchSheetData();
  }, []);

  return (
    <div>
      <h1>Google Sheets Viewer</h1>
      {loading && <p>Loading...</p>} {/* 로딩 상태 표시 */}
      {/* Google Sheet 목록을 보여주는 섹션 */}
      <section>
        <h2>Google Sheets 목록</h2>
        <ul>
          {sheets.map((sheet: Sheet) => (
            <li key={sheet.id}>
              {sheet.name} - {sheet.mimeType}
              <button
                onClick={() => {
                  // 선택된 Google Sheet 데이터를 가져오기 위한 버튼 (구현 필요)
                }}
              >
                보기
              </button>
            </li>
          ))}
        </ul>
      </section>
      {/* Google Sheet 데이터를 보여주는 섹션 */}
      <section>
        <h2>View Sheet Data</h2>
        <table border={1}>
          <thead>
            <tr>
              {sheetData[0]?.map((_, index) => (
                <th key={index}>Column {index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sheetData) && sheetData.length > 1 ? (
              sheetData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={sheetData[0]?.length || 1}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={downloadSheet}>Download as CSV</button>
      </section>
      {/* 새 Google Sheet를 생성하는 섹션 */}
      <section>
        <h2>Create New Sheet</h2>
        <input
          type="text"
          placeholder="Sheet Name"
          value={newSheetName}
          onChange={(e) => setNewSheetName(e.target.value)}
        />
        <textarea
          placeholder="Sheet Data (JSON format)"
          value={newSheetData}
          onChange={(e) => setNewSheetData(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Emails (comma-separated)"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
        />
        <button onClick={createSheet}>Create Sheet</button>
      </section>
    </div>
  );
};

export default GoogleSheetsViewer;
