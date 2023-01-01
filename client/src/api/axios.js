import axios from "axios";
axios.defaults.withCredentials = true;

// 2 different axios instances specially for refreshing token.
export default axios.create({
  baseURL: "http://localhost:3000/",
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:3000/",
});
