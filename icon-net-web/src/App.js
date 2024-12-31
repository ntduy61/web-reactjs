import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// Import các trang
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Import Layout
import Layout from "./Layout";

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
  const userCookie = Cookies.get("User");
  return userCookie ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route mặc định chuyển hướng tới Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Route đăng nhập */}
        <Route path="/login" element={<Login />} />

        {/* Route được bảo vệ, sử dụng Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback cho route không tìm thấy */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
