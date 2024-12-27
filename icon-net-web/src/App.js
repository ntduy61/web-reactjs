import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const userCookie = Cookies.get("User");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userCookie ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
