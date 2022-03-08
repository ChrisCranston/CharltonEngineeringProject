import React from "react";
import Logo from "../img/logo.jpg";
import { NavLink, useLocation } from "react-router-dom";

const VariableNav = ({ isAuthenticated, isManager, handleAuthentication }) => {
  const location = useLocation().pathname;

  return (
    <div className="top">
      <img src={Logo} className="logo" alt="Website Logo" />
      <nav>
        <ul className="nav">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!isAuthenticated && (
            <li>
              <NavLink to="customerquery">Contact Us</NavLink>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="assembly-parts">Assembly Parts</NavLink>
              </li>
              <li>
                <NavLink to="storage">Storage</NavLink>
                {location.split("/")[1] === "storage" && (
                  <nav>
                    <li>
                      <NavLink to="/storage/storage-parts">Parts</NavLink>
                    </li>
                    <li>
                      <NavLink to="/storage/storage-locations">
                        Locations
                      </NavLink>
                    </li>
                  </nav>
                )}
              </li>
              {isManager && (
                <>
                  <li>
                    <NavLink to="reporting">Reporting</NavLink>
                    {location.split("/")[1] === "reporting" && (
                      <nav>
                        <li>
                          <NavLink to="/reporting/assembly-reports">
                            Assembly Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/reporting/storage-reports">
                            Storage Reports
                          </NavLink>
                        </li>
                      </nav>
                    )}
                  </li>
                  <li>
                    <NavLink to="user-management">User Management</NavLink>
                  </li>
                  <li>
                    <NavLink to="account">My Account</NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
      <button onClick={handleAuthentication}>
        {isAuthenticated ? "Temp Logout Button" : "Temp Login Button"}
      </button>
    </div>
  );
};

export default VariableNav;
