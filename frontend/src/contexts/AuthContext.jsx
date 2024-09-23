import React, { createContext, useState, useContext, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
} from "../utils/api";

const API_URL = "http://localhost:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const updateUser = (key, value) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const checkUser = async () => {
    try {
      setLoading(true);
      const get_user = await getCurrentUser();
      if (get_user && get_user._id) {
        setUser((prev) => {
          return {
            ...get_user,
            avatarUrl: API_URL + "/" + get_user.avatarUrl,
          };
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    setUser(res.user);
  };

  const register = async (username, email, password) => {
    const user = await apiRegister(username, email, password);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, updateUser, login, register, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
