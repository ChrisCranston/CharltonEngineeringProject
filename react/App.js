import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage.js";
import QueryPage from "./components/home/QueryPage.js"
import StoragePage from "./components/storage/StoragePage.js";

function App() {
  return (
    <HashRouter>
      <div className="top">
        <nav>
          <ul className="nav">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="customerquery">Contact Us</Link>
            </li>
            <li>
              <Link to="storage">storage</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="customerquery" element={<QueryPage />} />
        <Route path="storage" element={<StoragePage />} />
      </Routes>
      <footer className="foot">
        <p>footer text</p>
      </footer>
    </HashRouter>
  );
}

export default App;
