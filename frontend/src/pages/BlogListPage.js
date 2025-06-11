import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import blogService from '../services/blogService';
import { useAuth } from '../contexts/AuthContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchBlogs = async (page) => {
    setLoading(true);
    setError('');
    try {
      const data = await blogService.getBlogs(page);
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError(err || 'Failed to fetch blogs. Please try again.');
      console.error("Fetch blogs error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(blogId);
        if (blogs.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          fetchBlogs(currentPage);
        }
      } catch (err) {
        setError(err || 'Failed to delete blog.');
        console.error("Delete blog error:", err);
      }
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 rounded-xl mb-16 bg-gradient-to-br from-primary via-accent to-secondary shadow-lg text-white">
        <h1 className="text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white animate-fade-in-down drop-shadow-lg">
          Write. Share. Inspire.
        </h1>
        <p className="text-xl mt-4 text-white/90 max-w-2xl mx-auto">
          A bold, developer-focused blogging platform built to stand out. ✨
        </p>
        <div className="mt-8">
          <Link
            to="/create-blog"
            className="inline-block bg-white text-primary font-bold text-lg px-8 py-3 rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            + Start Writing
          </Link>
        </div>
      </section>

      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary text-center mb-12 drop-shadow-md">
        🚀 Explore the Latest Blogs
      </h1>

      {error && (
        <div className="text-red-500 bg-red-100 border border-red-200 p-4 rounded text-center mb-8">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow-lg">
              <Skeleton height={30} width="80%" />
              <Skeleton count={4} className="mt-3" />
            </div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center bg-white/10 backdrop-blur-sm p-10 rounded-xl shadow-xl">
          <p className="text-2xl font-semibold mb-4 text-gray-800">No blogs yet 😢</p>
          <p className="text-md text-gray-600">
            {user ? (
              <>Be the first to <Link to="/create-blog" className="text-primary hover:underline font-bold">create one</Link>!</>
            ) : (
              <>Please <Link to="/signup" className="text-primary hover:underline font-bold">sign up</Link> or <Link to="/login" className="text-primary hover:underline font-bold">log in</Link> to get started.</>
            )}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white/20 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-glow transition-all transform hover:scale-105 hover:shadow-neon text-white"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-gray-800">
                    <Link 
                      to={`/blogs/${blog.id}`}
                      className="hover:text-primary transition-colors duration-200"
                    >
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
                    <span>By <span className="font-medium text-gray-700">{blog.author_username || 'Anonymous'}</span></span>
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                  {user && user.id === blog.author && (
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        onClick={() => navigate(`/edit-blog/${blog.id}`)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 space-x-2">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default BlogListPage;