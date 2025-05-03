// submitUsersFiles.ts
import axios from "axios";

export const submitUsersFiles = async (
  files: File[],
  groupName: string = "default"
) => {
  if (!files || files.length === 0) {
    alert("업로드할 파일이 없습니다.");
    return;
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("groupName", groupName);

  try {
    const response = await axios.post(
      "http://localhost:8080//api/excel/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(response.data || "업로드 및 분석 완료");
  } catch (error: any) {
    console.error("에러 : ", error);
    alert(
      error.response?.data ||
        "전송에 실패했습니다. 파일 또는 chart_key를 확인해주세요."
    );
  }
};
