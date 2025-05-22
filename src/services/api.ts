import axios from "axios";

const PORT = 3000;

const API = axios.create({
  // set default endpoint
  baseURL: `https://localhost:${PORT}`,
});

export default API;
