import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogService from '../services/blogService';

function CreateBlogPage() {
  const [title, setTitle] = useState(''); // State for the blog post title
  const [content, setContent] = useState(''); // State for the blog post content
  const [error, setError] = useState(''); // State for displaying error messages
  const [message, setMessage] = useState(''); // State for displaying success messages
  const [loading, setLoading] = useState(false); // Controls loading spinner and button disabled state
  const navigate = useNavigate(); // For programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setMessage(''); // Clear previous messages
    setLoading(true); // Start loading state for form submission

    try {
      await blogService.createBlog(title, content); // Call backend API to create blog
      setMessage('Blog post created successfully!'); // Success message
      setTitle(''); // Clear the title input field
      setContent(''); // Clear the content textarea
      setTimeout(() => navigate('/'), 1500); // Redirect to the home page after a short delay
    } catch (err) {
      // Catch and display any errors during blog creation
      setError(err || 'Failed to create blog post. Please check your input and try again.');
      console.error("Create blog error:", err); // Log detailed error for debugging
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="container mx-auto p-6 lg:p-8 max-w-3xl bg-white rounded-xl shadow-lg mt-8 border border-gray-100">
      {/* Page Title - Bold and centered */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        Create New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dynamic Error Message Display */}
        {error && (
          <p className="text-red-600 bg-red-50 p-3 rounded-md border border-red-200 text-center text-sm font-medium animate-fade-in">
            {error}
          </p>
        )}
        {/* Dynamic Success Message Display */}
        {message && (
          <p className="text-green-600 bg-green-50 p-3 rounded-md border border-green-200 text-center text-sm font-medium animate-fade-in">
            {message}
          </p>
        )}

        <div>
          {/* Title Input Field */}
          <label htmlFor="title" className="block text-md font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-md transition-colors duration-200"
            placeholder="A compelling title for your blog..."
          />
        </div>
        <div>
          {/* Content Textarea */}
          <label htmlFor="content" className="block text-md font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="15"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-md resize-y transition-colors duration-200"
            placeholder="Write your amazing blog content here..."
          ></textarea>
        </div>
        <div>
          {/* Submit Button - Dynamic text, loading spinner, and visual feedback */}
          <button
            type="submit"
            disabled={loading} // Button disabled when loading
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              // Loading spinner SVG
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Publish Blog Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlogPage;