import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //backend Url
  withCredentials: true, //automatically grab your authentication cookie from the browser and securely send it with every single backend request and not blocked
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // FIX: Check if the user is already on the login path
    const isLoginPage = window.location.pathname === "/login";
    // Only force a hard browser redirect if the user is NOT already on the login page
    if (error.response?.status === 401 && !isLoginPage) {
      localStorage.removeItem("developer");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
export default api;
