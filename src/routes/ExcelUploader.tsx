import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import styled from "styled-components";

interface DataRow {
  [key: string]: string | number;
}

interface IItems {
  mainMenus: string;
  item: string;
  year: string;
  showExcel: boolean;
  onLoadFile: (filePath: string) => void; // 추가된 부분
}

const Table = styled.table`
  /* border-collapse: collapse;   width: 100%;   margin-top: 20px; */
`;

const TableHeader = styled.th`
  /* border: 1px solid #ddd;   padding: 10px;   background-color: #f2f2f2;   font-weight: bold; */
`;

const TableCell = styled.td`
  /* border: 1px solid #ddd;   padding: 8px; */
`;

const Input = styled.input`
  /* border: 1px solid #ccc;   border-radius: 4px;   padding: 4px;   width: 100%;   box-sizing: border-box; */
`;

const ErrorMessage = styled.div`
  color: red;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const Title = styled.h2`
  margin: 20px 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;
function ExcelUploader({ mainMenus, item, year, showExcel }: IItems) {
  const [data, setData] = useState<DataRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadExcelFile = async (fileName: string) => {
    try {
      const response = await fetch(fileName);
      if (!response.ok) {
        throw new Error("파일을 가져오는 중 오류가 발생했습니다.");
      }
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        if (typeof bstr === "string") {
          try {
            const workbook = XLSX.read(bstr, { type: "binary" });
            const wsname = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[wsname];
            const jsonData: DataRow[] = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
            setError(null);
          } catch (error) {
            setData([]);
            setError("엑셀 파일을 읽는 중 오류가 발생했습니다.");
          }
        }
      };

      reader.readAsArrayBuffer(blob);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChange = (index: number, key: string, value: string) => {
    const updatedData = [...data];
    updatedData[index][key] = value;
    setData(updatedData);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "modified_data.xlsx");
  };

  // E:\ir-uhs\public\새 폴더\재학생 충원율 19~23\2019 재학생 충원율.xlsx

  useEffect(() => {
    if (showExcel) {
      const filePath =
        mainMenus === "교원DB"
          ? `./public/새 폴더/${item} 21~23/${year} ${item}.xlsx`
          : `./public/새 폴더/${item} 19~23/${year} ${item}.xlsx`;
      console.log(item, year);
      loadExcelFile(filePath); // 자동으로 엑셀 파일 로드
    }
  }, [mainMenus, item, year, showExcel]);

  return (
    <div>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <>
        <Title>{`${year}년도 ${item}`}</Title>

        <Table>
          <thead>
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <TableHeader key={key}>{key}</TableHeader>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row).map((key) => (
                    <TableCell key={key}>
                      <Input
                        value={row[key] as string}
                        onChange={(e) =>
                          handleChange(index, key, e.target.value)
                        }
                      />
                    </TableCell>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <TableCell colSpan={Object.keys(data[0] || {}).length}>
                  데이터가 없습니다.
                </TableCell>
              </tr>
            )}
          </tbody>
        </Table>

        <Button onClick={downloadExcel}>엑셀 파일로 저장</Button>
      </>
    </div>
  );
}

export default ExcelUploader;
