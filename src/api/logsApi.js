import api from "./axios.js";
export const getLogsApi = (appName, params) =>
  api.get(`/api/applications/${appName}/logs`, { params });
