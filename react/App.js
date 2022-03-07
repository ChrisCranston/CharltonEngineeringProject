import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VariableNav from "./components/VariableNav";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import HomePage from "./components/HomePage.js";
import StoragePage from "./components/storage/StoragePage.js";
import AssemblyPartsPage from "./components/AssemblyParts/AssemblyPartsPage";
import QueryPage from "./components/home/QueryPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    if (isAuthenticated === true) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  };

  const isManager = true; //  <-- Instead of authenticated = true/false, will need string based variables rather than booleans, so can check if === worker/manager etc. to restrict functionality

  return (
    <HashRouter>
      <VariableNav
        isAuthenticated={isAuthenticated}
        isManager={isManager}
        handleAuthentication={handleAuthentication}
      />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />

        <Route path="customerquery" element={<QueryPage/>} />

        <Route
          path="assembly-parts"
          element={
            <RestrictedRoute isAuthenticated={isAuthenticated}>
              <AssemblyPartsPage test="THIS IS A TEST PROP" />
            </RestrictedRoute>
          }
        />

        <Route path="storage">
          <Route
            index
            element={
              <RestrictedRoute isAuthenticated={isAuthenticated}>
                <h1>STORAGE HOMEPAGE</h1>
              </RestrictedRoute>
            }
          />
          <Route
            path="storage-parts"
            element={
              <RestrictedRoute isAuthenticated={isAuthenticated}>
                <StoragePage />
              </RestrictedRoute>
            }
          />
          <Route
            path="storage-locations"
            element={
              <RestrictedRoute isAuthenticated={isAuthenticated}>
                <h1>STORAGE LOCATIONS</h1>
              </RestrictedRoute>
            }
          />
        </Route>

        <Route path="reporting">
          <Route
            index
            element={
              <RestrictedRoute isAuthenticated={isManager && isAuthenticated}>
                <h1>REPORTING HOMEPAGE</h1>
              </RestrictedRoute>
            }
          />
          <Route
            path="assembly-reports"
            element={
              <RestrictedRoute isAuthenticated={isManager && isAuthenticated}>
                <h1>ASSEMBLY REPORTS PAGE</h1>
              </RestrictedRoute>
            }
          />
          <Route
            path="storage-reports"
            element={
              <RestrictedRoute isAuthenticated={isManager && isAuthenticated}>
                <h1>STORAGE REPORTS PAGE</h1>
              </RestrictedRoute>
            }
          />
        </Route>

        <Route
          path="user-management"
          element={
            <RestrictedRoute isAuthenticated={isManager && isAuthenticated}>
              <h1>USER MANAGEMENT PAGE</h1>
            </RestrictedRoute>
          }
        />

        <Route
          path="account"
          element={
            <RestrictedRoute isAuthenticated={isManager && isAuthenticated}>
              <h1>ACCOUNT PAGE</h1>
            </RestrictedRoute>
          }
        />

        <Route
          path="*"
          element={
            <h1>404 NOT FOUND GO BACK TO HOME (make this a component)</h1>
          }
        />
      </Routes>

      <footer className="foot">
        <p>footer text</p>
      </footer>
    </HashRouter>
  );
}

export default App;
