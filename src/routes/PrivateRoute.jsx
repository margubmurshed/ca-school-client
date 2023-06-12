import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, userLoading } = useAuth();

  if (userLoading)
    return (
      <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    );

  if (user) return children;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;
