import React from "react";
import Logo from "../img/logo - Copy.jpg";
import { NavLink, useLocation } from "react-router-dom";

const VariableNav = ({ isAuthenticated, isManager, handleAuthentication }) => {
  const location = useLocation().pathname;

  return (
    <div className="top">
      <img src={Logo} className="logo" alt="Website Logo" />
      <nav>
        <ul className="nav">
          <li>
            <NavLink to="/" className="styledNavLink">Home</NavLink>
          </li>
          {!isAuthenticated && (
            <li>
              <NavLink to="customerquery"   className="styledNavLink" >Contact Us</NavLink>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="assembly-parts" className="styledNavLink">Assembly Parts</NavLink>
              </li>
              <li>
                <NavLink to="storage" className="styledNavLink">Storage</NavLink>
                {location.split("/")[1] === "storage" && (
                  <nav>
                    <li>
                      <NavLink to="/storage/storage-parts" className="styledNavLink">Parts</NavLink>
                    </li>
                    <li>
                      <NavLink to="/storage/storage-locations" className="styledNavLink">
                        Locations
                      </NavLink>
                    </li>
                  </nav>
                )}
              </li>
              {isManager && (
                <>
                  <li>
                    <NavLink to="reporting" className="styledNavLink">Reporting</NavLink>
                    {location.split("/")[1] === "reporting" && (
                      <nav>
                        <li>
                          <NavLink to="/reporting/assembly-reports" className="styledNavLink">
                            Assembly Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/reporting/storage-reports" className="styledNavLink">
                            Storage Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/reporting/customer-reports">
                            Customer Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/reporting/assembly-interaction-reports">
                          Assembly Interaction Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/reporting/storage-interaction-reports">
                          Storage Interaction Reports
                          </NavLink>
                        </li>
                      </nav>
                    )}
                  </li>
                  <li>
                    <NavLink to="user-management" className="styledNavLink">User Management</NavLink>
                  </li>
                  <li>
                    <NavLink to="account" className="styledNavLink">My Account</NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
      <button id="loginbutton" onClick={handleAuthentication}>
        {isAuthenticated ? "Temp Logout Button" : "Temp Login Button"}
      </button>
    </div>
  );
};

export default VariableNav;
