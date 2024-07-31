//import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
const ProtectedRoute = (props: any) => {
  const token = localStorage.getItem("token");
  if(token != null){
    const decodedToken=jwt_decode(token);
    const currentTime = Date.now() / 1000;
    const isTokenExpired = decodedToken.exp < currentTime;
          if(isTokenExpired){
            return <div><Navigate to="/"></Navigate>;
            {toast.info('your sessionn has expired please login again!')}
            </div>
          }
      }
  if (token == undefined) {
    return <Navigate to="/"></Navigate>;
  }

  return props.children;
};

export default ProtectedRoute;