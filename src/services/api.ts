import axios from "axios";

const API = axios.create({
  // set default endpoint
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

export default API;
