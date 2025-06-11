import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogCreateEditPage from "./pages/BlogCreateEditPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<BlogListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/blogs/new" element={<BlogCreateEditPage />} />
            <Route path="/blogs/:id/edit" element={<BlogCreateEditPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;