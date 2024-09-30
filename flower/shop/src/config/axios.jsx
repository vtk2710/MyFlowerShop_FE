import axios from "axios";
const baseUrl = "https://localhost:7198";

const config = {
  baseUrl: baseUrl,
};

const api = axios.create(config);
api.defaults.baseURL = baseUrl;

// xu li hanh dong truoc khi call api
// lay token tu localstorage
const handelBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
api.interceptors.request.use(handelBefore);
export default api;
