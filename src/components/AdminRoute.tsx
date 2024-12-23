import { useAuth } from "../context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
    children: React.ReactNode;
  }
  
  const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
  
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    if (user?.role !== "Admin") {
      return <Navigate to="/Portfolio" replace />;
    }
    
    return <>{children}</>;
  };
  
  export default AdminRoute;
  