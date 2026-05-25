import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, registerApi, logoutApi } from "../api/authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("developer");
    if (stored) setDeveloper(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (data) => {
    try {
      const res = await loginApi(data);
      setDeveloper(res.data);
      localStorage.setItem("developer", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const register = async (data) => {
    try {
      const res = await registerApi(data);
      setDeveloper(res.data);
      localStorage.setItem("developer", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout request failed on backend", err);
    } finally {
      setDeveloper(null);
      localStorage.removeItem("developer");
    }
  };

  return (
    <AuthContext.Provider
      value={{ developer, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
