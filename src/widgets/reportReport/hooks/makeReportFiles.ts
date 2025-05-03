import axios from "axios";

export const makeReportFiles = async () => {
  const response = await axios.get(`http://localhost:8080/api/report/generate`);
};
