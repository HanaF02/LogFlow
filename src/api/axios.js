import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true, 
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginPage = window.location.pathname === "/login";
    if (error.response?.status === 401 && !isLoginPage) {
      localStorage.removeItem("developer");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
export default api;
