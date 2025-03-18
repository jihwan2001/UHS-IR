import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true; // ✅ 모든 요청에서 세션 유지

export default axios;
