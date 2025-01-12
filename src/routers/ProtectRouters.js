import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectRouters({ children }) {
  const userAuthenticate = useSelector((state) => state.loginReducer);
  const isAuthenticated = userAuthenticate?.isAuthenticated;
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}

export default ProtectRouters;
