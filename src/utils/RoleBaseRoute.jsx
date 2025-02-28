import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  // Normalize roles for a case-insensitive comparison
  const normalizedUserRole = user.role?.toLowerCase();
  const normalizedRequiredRoles = requiredRole.map((role) => role.toLowerCase());

  if (!normalizedRequiredRoles.includes(normalizedUserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBaseRoute;
