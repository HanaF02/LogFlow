import api from "./axios.js";
export const registerApi = (data) => api.post("/api/users/register", data); 
export const loginApi = (data) => api.post("/api/users/login", data);
export const logoutApi = () => api.post("/api/users/logout");
