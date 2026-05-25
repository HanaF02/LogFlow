import api from "./axios.js";
export const registerApi = (data) => api.post("/api/users/register", data); //Axios automatically combines your base URL with this route path to execute a POST request
export const loginApi = (data) => api.post("/api/users/login", data);
export const logoutApi = () => api.post("/api/users/logout");
