import axios from "axios";

// initialize axios
const api = axios.create({
  baseURL: "http://localhost:3000",
});


export default api;
