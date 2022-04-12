import React from "react";

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
    <h1>403 FORBIDDEN COMPONENT LINK BACK TO HOME PAGE</h1>
  );
};

export default RestrictedRoute;
