import React from "react";
import { NavLink, useLocation } from "react-router-dom";

/**
 * RestrictedRoute function component
 *
 * Rendered inside a Route.
 * Allows access to a child component or redirects the user
 * to a different URL depending on a passed in boolean "isAuthenticated".
 *
 * @author Matthew William Dawson W18002221
 */
const RestrictedRoute = ({ children, isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    children
  ) : (
    <h1 className="p403">You do not have the correct access rights for this page, please login and try again or return <NavLink to="/" className="homelink">HOME</NavLink> </h1>
  );
};

export default RestrictedRoute;
