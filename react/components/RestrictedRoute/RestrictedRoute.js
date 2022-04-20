import React from "react";
import { NavLink } from "react-router-dom";

const RestrictedRoute = ({ children, isAuthenticated, ...props }) => {
  return isAuthenticated ? children : <h1 className="p403">You do not have the correct access rights for this page, please login and try again or return <NavLink to="/" className="homelink">HOME</NavLink> </h1>;
};

export default RestrictedRoute;
