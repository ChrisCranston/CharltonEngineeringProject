import React from "react";
import Logo from "../img/logo - Copy.jpg";
import { NavLink, useLocation } from "react-router-dom";

const VariableNav = ({ isAuthenticated, isManager, handleAuthentication }) => {
  const location = useLocation().pathname;

  return (
    <div className="top">
      <NavLink to="/" ><img src={Logo} className="logo" alt="Website Logo" /></NavLink>
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
              <li id="storagedropdown">
                <NavLink to="/storage/storage-manager" className="styledNavLinkStorage" >Storage</NavLink>
                {location.split("/")[1] === "storage" && (
                  <nav className="navdropstorage">
                    <li>
                      <NavLink to="/storage/storage-manager" className="styledNavLinkStorage">Locations</NavLink>
                    </li>
                    <li>
                      <NavLink to="/storage/storage-parts" className="styledNavLinkStorage">Parts</NavLink>
                    </li>
                  </nav>
                )}
              </li>
              {isManager && (
                <>
                  <li id="reportingdropdown">
                    <NavLink to="/reporting/assembly-reports" className="styledNavLinkReporting">Reporting</NavLink>
                    {location.split("/")[1] === "reporting" && (
                      <nav className="navdropreporting">
                        <li>
                          <NavLink to="/reporting/assembly-reports" className="styledNavLinkReporting">
                            Assembly Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/reporting/storage-reports" className="styledNavLinkReporting">
                            Storage Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/reporting/customer-reports" className="styledNavLinkReporting">
                            Customer Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/reporting/assembly-interaction-reports" className="styledNavLinkReporting">
                          Assembly Interaction Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/reporting/storage-interaction-reports" className="styledNavLinkReporting">
                          Storage Interaction Reports
                          </NavLink>
                        </li>
                      </nav>
                    )}
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
