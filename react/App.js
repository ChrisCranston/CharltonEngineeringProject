import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage.js";
import StoragePage from "./components/storage/StoragePage.js";
import Logo from "./img/logo-Placeholder.png";
function App() {

      return (
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="storage" element={<StoragePage />} />
          </Routes>
          <footer className="foot">
            <p>footer text</p>
          </footer>
        </HashRouter>
      );
    }
export default App;
