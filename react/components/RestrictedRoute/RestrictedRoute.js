import React from "react";

const RestrictedRoute = ({ children, isAuthenticated, ...props }) => {
  return isAuthenticated ? children : <h1>403 Permission Denied</h1>;
};

export default RestrictedRoute;
