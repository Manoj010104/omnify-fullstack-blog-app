import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../services/blogService';
import { useAuth } from '../contexts/AuthContext'; // Correct import path
import Skeleton from 'react-loading-skeleton'; // For skeleton loader

function EditBlogPage() {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user for authorization check
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogData, setBlogData] = useState(null); // Stores original blog data for author check
  const [loading, setLoading] = useState(true); // Overall page loading
  const [error, setError] = useState(''); // General error message
  const [message, setMessage] = useState(''); // Success message
  const [saving, setSaving] = useState(false); // Saving state for form submission

  useEffect(() => {
    const fetchBlogForEdit = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await blogService.getBlogById(id);
        setBlogData(data); // Store the fetched blog data
        
        // --- Authorization Check ---
        // Ensure user is logged in AND is the author of this blog
        if (user && user.id === data.author) { // data.author is the author's ID from backend
          setTitle(data.title);
          setContent(data.content);
        } else {
          // If not authorized, set error and redirect
          setError('You are not authorized to edit this blog.');
          setTimeout(() => navigate(`/blogs/${id}`), 1500); // Redirect after short delay
        }
      } catch (err) {
        // Handle cases where blog doesn't exist or API fails
        setError('Failed to load blog post for editing. It may not exist.');
        console.error("Fetch blog for edit error:", err);
        setTimeout(() => navigate('/'), 1500); // Redirect to home on severe error
      } finally {
        setLoading(false);
      }
    };

    // Only attempt to fetch blog for edit if user data is available
    if (user) {
      fetchBlogForEdit();
    } else {
      // If no user, it means not logged in, redirect to login
      setLoading(false);
      navigate('/login');
    }
  }, [id, user, navigate]); // Depend on id, user, and navigate to re-run if they change

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true); // Start saving state

    try {
      await blogService.updateBlog(id, title, content);
      setMessage('Blog post updated successfully!');
      setTimeout(() => navigate(`/blogs/${id}`), 1500); // Redirect to detail page after update
    } catch (err) {
      setError(err || 'Failed to update blog post. Please try again.');
      console.error("Update blog error:", err);
    } finally {
      setSaving(false); // End saving state
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 lg:p-8 max-w-3xl bg-white rounded-xl shadow-lg mt-8 animate-pulse">
        <h1 className="text-4xl font-bold text-gray-800 mb-4"><Skeleton height={40} width="60%" /></h1>
        <div className="space-y-6 mt-8">
          <Skeleton height={50} />
          <Skeleton height={200} />
          <Skeleton height={48} width="100%" />
        </div>
      </div>
    );
  }

  // Display specific authorization error before redirecting, or if user is somehow not authorized
  if (error === 'You are not authorized to edit this blog.' || !user || user.id !== blogData?.author) {
    return (
      <div className="container mx-auto p-8 max-w-3xl text-red-600 bg-red-50 rounded-md border border-red-200 mt-8 text-center text-lg">
        {error || "You are not authorized to view this page or edit this blog."}
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 lg:p-8 max-w-3xl bg-white rounded-xl shadow-lg mt-8 border border-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        Edit Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display error and message feedback */}
        {error && (
          <p className="text-red-600 bg-red-50 p-3 rounded-md border border-red-200 text-center text-sm font-medium">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-600 bg-green-50 p-3 rounded-md border border-green-200 text-center text-sm font-medium">
            {message}
          </p>
        )}

        <div>
          <label htmlFor="title" className="block text-md font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md transition-colors duration-200"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-md font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="15"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md resize-y transition-colors duration-200"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            disabled={saving} // Disable button when saving
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlogPage;