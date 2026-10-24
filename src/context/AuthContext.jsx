import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("clicklanka_token") || localStorage.getItem("luxecart_token") || null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    async function loadUser() {
      const storedToken = localStorage.getItem("clicklanka_token") || localStorage.getItem("luxecart_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getMe();
        if (response?.data) {
          setUser(response.data);
        }
      } catch (err) {
        console.warn("Session expired or invalid token:", err.message);
        localStorage.removeItem("clicklanka_token");
        localStorage.removeItem("luxecart_token");
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res?.data?.token && res?.data?.user) {
      localStorage.setItem("clicklanka_token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
  };

  const register = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    if (res?.data?.token && res?.data?.user) {
      localStorage.setItem("clicklanka_token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
  };

  const logout = () => {
    localStorage.removeItem("clicklanka_token");
    localStorage.removeItem("luxecart_token");
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    const res = await authService.updateProfile(profileData);
    if (res?.data) {
      setUser(res.data);
      return res.data;
    }
  };

  const refreshUser = async () => {
    try {
      const res = await authService.getMe();
      if (res?.data) setUser(res.data);
    } catch {
      // ignore
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
