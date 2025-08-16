// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ roles = [], children }) {
  const { username, role } = useAuth();
  if (!username) return <Navigate to="/login" replace />;

  if (roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/403" replace />; // or show a "Forbidden" page
  }

  return children;
}
