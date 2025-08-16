// src/hooks/useAuth.jsx
import { useSelector } from "react-redux";

export default function useAuth() {
  const { user } = useSelector((s) => s.auth);
  return {
    isAdmin: user?.role === "ADMIN",
    isManager: user?.role === "MANAGER",
    isViewer: user?.role === "VIEWER",
    ...user,
  };
}
