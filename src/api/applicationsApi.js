import api from "./axios.js";
export const getApplicationsApi = () => api.get("/api/applications");
export const getApplicationByNameApi = (name) =>
  api.get(`/api/applications/${name}`);
export const createApplicationApi = (data) =>
  api.post("/api/applications", data);
export const deleteApplicationApi = (name) =>
  api.delete(`/api/applications/${name}`);
