import React from "react";
import Logo from "../img/logo - Copy.jpg";
import { NavLink, useLocation } from "react-router-dom";

const VariableNav = ({ accessLevel, handleAuthentication }) => {
  const location = useLocation().pathname;

  const workerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3b3JrZXIifQ.CUiaWSG99SRyCWgy2b7d8GSGSUB6aP0SPaWqkSnerlQ";

  const managerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW5hZ2VyIn0.PJUzmUd_vB_ajjHo4VmxqYfBgTQTNJmKUSUT9OlJYOQ";

  return (
    <div className="top">
      <img src={Logo} className="logo" alt="Website Logo" />
      <nav>
        <ul className="nav">
          <li>
            <NavLink to="/" className="styledNavLink">
              Home
            </NavLink>
          </li>
          {!accessLevel && (
            <li>
              <NavLink to="customerquery" className="styledNavLink">
                Contact Us
              </NavLink>
            </li>
          )}
          {(accessLevel === "worker" || accessLevel === "manager") && (
            <>
              <li>
                <NavLink to="assembly-parts" className="styledNavLink">
                  Assembly Parts
                </NavLink>
              </li>
              <li id="storagedropdown">
                <NavLink
                  to="/storage/storage-manager"
                  className="styledNavLink"
                >
                  Storage
                </NavLink>
                {location.split("/")[1] === "storage" && (
                  <nav className="navdropstorage">
                    <li>
                      <NavLink
                        to="/storage/storage-manager"
                        className="styledNavLinkStorage"
                      >
                        Locations
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/storage/storage-parts"
                        className="styledNavLinkStorage"
                      >
                        Parts
                      </NavLink>
                    </li>
                  </nav>
                )}
              </li>
              {accessLevel === "manager" && (
                <>
                  <li id="reportingdropdown">
                    <NavLink to="reporting" className="styledNavLink">
                      Reporting
                    </NavLink>
                    {location.split("/")[1] === "reporting" && (
                      <nav className="navdropreporting">
                        <li>
                          <NavLink
                            to="/reporting/assembly-reports"
                            className="styledNavLinkReporting"
                          >
                            Assembly Reports
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/reporting/storage-reports"
                            className="styledNavLinkReporting"
                          >
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
      <div>
        {accessLevel === "worker" || accessLevel === "manager" ? (
          <button onClick={() => handleAuthentication()}>Logout</button>
        ) : (
          <div>
            <button onClick={() => handleAuthentication(workerToken)}>
              Worker Login
            </button>
            <button onClick={() => handleAuthentication(managerToken)}>
              Manager Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VariableNav;
