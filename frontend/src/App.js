import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/AuthPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
import { AuthProvider } from './contexts/AuthContext'; // Correct import path

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="min-h-[calc(100vh-64px)] bg-gray-50 pb-8"> {/* Added main styling */}
          <Routes>
            <Route path="/" element={<BlogListPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />

            {/* Protected Routes - only accessible to logged-in users */}
            <Route element={<PrivateRoute />}>
              <Route path="/create-blog" element={<CreateBlogPage />} />
              <Route path="/edit-blog/:id" element={<EditBlogPage />} />
            </Route>

            {/* Fallback for undefined routes */}
            <Route path="*" element={
                <div className="flex justify-center items-center h-[calc(100vh-64px)] text-4xl text-red-700 font-bold">
                    404 - Page Not Found
                </div>
            } />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;