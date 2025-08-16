// src/services/authService.js
import api from "./api";

const AUTH_PREFIX = "/api/v1/auth";

const login = async ({ username, password }) => {
  const { data } = await api.post(`${AUTH_PREFIX}/login`, { username, password });
  // Expecting: { token, username, role }
  if (data?.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));
  }
  return { username: data.username, role: data.role, token: data.token };
};

const logout = async () => {
  // if you have a revoke endpoint, call it here
  // await api.post(`${AUTH_PREFIX}/logout`);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export default { login, logout, getCurrentUser };
