import React from "react";

const RestrictedRoute = ({ children, isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    children
  ) : (
    <h1>403 FORBIDDEN COMPONENT LINK BACK TO HOME PAGE</h1>
  );
};

export default RestrictedRoute;
