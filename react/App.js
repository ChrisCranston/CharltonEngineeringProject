import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import VariableNav from "./components/VariableNav";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import HomePage from "./components/home/HomePage.js";
import QueryPage from "./components/home/QueryPage";
import StoragePartPage from "./components/storage/StoragePartPage.js";
import StorageLocationPage from "./components/storage/StorageLocationPage.js";
import AssemblyPartsPage from "./components/AssemblyPartsSystem/AssemblyPartsPage/AssemblyPartsPage";
import CustomerReportPage from "./components/reporting/CustomerReportPage.js";
import AssemblyReportPage from "./components/reporting/AssemblyReportPage.js";
import StorageReportPage from "./components/reporting/StorageReportPage.js";
import AssemblyInteractionPage from "./components/reporting/AssemblyInteractionPage.js";
import StorageInteractionPage from "./components/reporting/StorageInteractionPage.js";
import Footer from "./components/FooterComponent.js";
import "./App.css";

function App() {
  const [simToken, setSimToken] = useState(localStorage.getItem("simToken"));

  const accessLevel = simToken && jwt_decode(simToken).sub;

  const handleAuthentication = (token = null) => {
    if (token) {
      setSimToken(token);
      localStorage.setItem("simToken", token);
    } else {
      setSimToken(null);
      localStorage.removeItem("simToken");
    }
  };

  return (
    <HashRouter>
      <VariableNav
        accessLevel={accessLevel}
        handleAuthentication={handleAuthentication}
      />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />

        <Route path="customerquery" element={<QueryPage />} />

        <Route
          path="assembly-parts"
          element={
            <RestrictedRoute
              isAuthenticated={
                accessLevel === "worker" || accessLevel === "manager"
              }
            >
              <AssemblyPartsPage simToken={simToken} />
            </RestrictedRoute>
          }
        />

        <Route path="storage">
          <Route
            path="storage-manager"
            element={
              <RestrictedRoute
                isAuthenticated={
                  accessLevel === "worker" || accessLevel === "manager"
                }
              >
                <StorageLocationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="storage-parts"
            element={
              <RestrictedRoute
                isAuthenticated={
                  accessLevel === "worker" || accessLevel === "manager"
                }
              >
                <StoragePartPage />
              </RestrictedRoute>
            }
          />
        </Route>

        <Route path="reporting">
          <Route index element={<Navigate to="assembly-reports" />} />
          <Route
            path="assembly-reports"
            element={
              <RestrictedRoute isAuthenticated={accessLevel === "manager"}>
                <AssemblyReportPage />
                <h1>ASSEMBLY REPORTS PAGE</h1>
              </RestrictedRoute>
            }
          />
          <Route
            path="storage-reports"
            element={
              <RestrictedRoute isAuthenticated={accessLevel === "manager"}>
                <StorageReportPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="customer-reports"
            element={
              <RestrictedRoute isAuthenticated={accessLevel === "manager"}>
                <CustomerReportPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="assembly-interaction-reports"
            element={
              <RestrictedRoute isAuthenticated={accessLevel === "manager"}>
                <AssemblyInteractionPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="storage-interaction-reports"
            element={
              <RestrictedRoute isAuthenticated={accessLevel === "manager"}>
                <StorageInteractionPage />
              </RestrictedRoute>
            }
          />
        </Route>

        <Route
          path="user-management"
          element={
            <RestrictedRoute isAuthenticated={accessLevel === "manager"}>
              <h1>USER MANAGEMENT PAGE</h1>
            </RestrictedRoute>
          }
        />

        <Route
          path="account"
          element={
            <RestrictedRoute isAuthenticated={accessLevel === "manager"}>
              <h1>ACCOUNT PAGE</h1>
            </RestrictedRoute>
          }
        />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer position="bottom-center" theme="colored" limit={4} />
      <footer className="foot">
      <Footer />
      </footer>
    </HashRouter>
  );
}

export default App;
