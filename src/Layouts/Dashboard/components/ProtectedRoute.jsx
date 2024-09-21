import { Outlet, Navigate } from "react-router-dom";

export const DashboardProtected = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
};

export const LoginProtected = () => {
  return !localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" />
  );
};
