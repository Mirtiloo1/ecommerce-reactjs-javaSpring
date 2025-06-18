import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080";

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("nexusUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar dados do usuário:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const toastId = toast.loading("Entrando...");
    try {
      const response = await fetch(`${API_BASE_URL}/produtos`, {
        headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const is_admin = username === "admin";
      const userData = {
        username,
        auth: "Basic " + btoa(`${username}:${password}`),
        roles: is_admin ? ["ROLE_ADMIN"] : ["ROLE_USER"],
      };

      localStorage.setItem("nexusUser", JSON.stringify(userData));
      setUser(userData);
      toast.success("Login realizado com sucesso!", { id: toastId });
      navigate(is_admin ? "/dashboard" : "/");
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Falha no login. Verifique seu usuário e senha.", {
        id: toastId,
      });
    }
  };

  const register = async (username, email, password) => {
    const toastId = toast.loading("Registrando...");
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || "Falha ao registrar");
      }
      toast.success("Usuário registrado com sucesso!", { id: toastId });
      navigate("/login");
    } catch (error) {
      console.error("Erro no registro:", error);
      toast.error(`Erro no registro: ${error.message}`, { id: toastId });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nexusUser");
    toast.success("Você saiu da sua conta.");
    navigate("/login");
  };

  const value = { user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
