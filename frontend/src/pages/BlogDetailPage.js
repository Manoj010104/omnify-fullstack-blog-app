import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogService from '../services/blogService';
import Skeleton from 'react-loading-skeleton'; // For loading skeleton UI

function BlogDetailPage() {
  const { id } = useParams(); // Extracts the blog ID from the URL parameters
  const [blog, setBlog] = useState(null); // Stores the fetched blog data
  const [loading, setLoading] = useState(true); // Controls the loading state of the page
  const [error, setError] = useState(''); // Stores any error messages during blog fetching

  // Effect hook to fetch the specific blog post when the component mounts or ID changes
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true); // Start loading state
      setError(''); // Clear previous errors
      try {
        const data = await blogService.getBlogById(id); // Calls the backend API to get the blog
        setBlog(data); // Updates state with the fetched blog
      } catch (err) {
        // Displays a user-friendly error message if fetching fails
        setError('Failed to fetch blog post. It might not exist or there was a server error.');
        console.error("Fetch blog detail error:", err); // Logs detailed error for debugging
      } finally {
        setLoading(false); // End loading state
      }
    };
    fetchBlog();
  }, [id]); // Dependency array: re-run effect if the blog ID changes

  // Displays a skeleton loader while the blog content is being fetched
  if (loading) {
    return (
      <div className="container mx-auto p-6 lg:p-8 max-w-4xl bg-white rounded-xl shadow-lg mt-8 animate-pulse border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4"><Skeleton height={40} width="80%" /></h1>
        <div className="text-gray-600 text-sm mb-6 border-b pb-4">
          <p><Skeleton width="30%" /></p>
          <p><Skeleton width="25%" /></p>
        </div>
        <div className="prose max-w-none mb-8">
          <Skeleton count={10} />
        </div>
        <Link to="/" className="text-indigo-600 hover:underline"><Skeleton width="20%" /></Link>
      </div>
    );
  }

  // Displays a prominent error message if fetching failed
  if (error) {
    return (
      <div className="container mx-auto p-8 max-w-3xl text-red-600 bg-red-50 rounded-md border border-red-200 mt-8 text-center text-lg">
        {error}
      </div>
    );
  }

  // Displays a "Not Found" message if the blog object is null after loading
  if (!blog) {
    return (
      <div className="container mx-auto p-8 max-w-3xl text-gray-600 bg-gray-50 rounded-md border border-gray-200 mt-8 text-center text-lg">
        Blog post not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 lg:p-8 max-w-4xl bg-white rounded-xl shadow-lg mt-8 border border-gray-100">
      {/* Blog Title - Large, bold, and visually central */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        {blog.title}
      </h1>

      {/* Author and Date Meta Info - Clear and well-formatted */}
      <div className="text-gray-600 text-md mb-8 border-b border-gray-200 pb-6">
        <p className="font-semibold mb-1">By: <span className="text-gray-800">{blog.author_username || 'Anonymous'}</span></p>
        <p>Published on: <span className="text-gray-800">{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></p>
      </div>

      {/* Blog Content - Styled for readability with prose classes */}
      <div className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed mb-10">
        <p className="whitespace-pre-wrap">{blog.content}</p> {/* Preserves original line breaks */}
      </div>

      {/* Back to Blogs Link - Visually distinct and includes an arrow icon for clarity */}
      <Link
        to="/"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200 text-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0L6.586 10l4.707-4.707a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to All Blogs
      </Link>
    </div>
  );
}

export default BlogDetailPage;