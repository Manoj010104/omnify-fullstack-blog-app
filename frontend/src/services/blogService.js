// frontend/src/services/blogService.js
import api from '../utils/api';

// Helper function to extract a readable error message from Axios error
const getErrorMessage = (error) => {
  let errorMessage = 'An unexpected error occurred.';
  if (error.response && error.response.data) {
    if (typeof error.response.data === 'string') {
      errorMessage = error.response.data;
    } else if (error.response.data.detail) {
      errorMessage = error.response.data.detail;
    } else if (error.response.data.messages && Array.isArray(error.response.data.messages)) {
      errorMessage = error.response.data.messages.map(msg => msg.message).join('; ');
    } else if (typeof error.response.data === 'object' && Object.keys(error.response.data).length > 0) {
      errorMessage = Object.values(error.response.data).flat().filter(Boolean).join('; ');
    } else {
      errorMessage = 'An unknown error occurred from the server.';
    }
  } else if (error.message) {
    errorMessage = error.message;
  }
  return errorMessage;
};


const getBlogs = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/blogs/?page=${page}&page_size=${limit}`);
    return {
        blogs: response.data.results,
        currentPage: page,
        totalPages: Math.ceil(response.data.count / limit),
        totalBlogs: response.data.count
    };
  } catch (error) {
    console.error("Error fetching blogs:", error.response?.data || error.message || error);
    throw getErrorMessage(error); // Throw the extracted string
  }
};

const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error.response?.data || error.message || error);
    throw getErrorMessage(error); // Throw the extracted string
  }
};

const createBlog = async (title, content) => {
  try {
    const response = await api.post('/blogs/', { title, content });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error.response?.data || error.message || error);
    throw getErrorMessage(error); // Throw the extracted string
  }
};

const updateBlog = async (id, title, content) => {
  try {
    const response = await api.put(`/blogs/${id}/`, { title, content });
    return response.data;
  } catch (error) {
    console.error(`Error updating blog ${id}:`, error.response?.data || error.message || error);
    throw getErrorMessage(error); // Throw the extracted string
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blogs/${id}/`);
    return response.status;
  } catch (error) {
    console.error(`Error deleting blog ${id}:`, error.response?.data || error.message || error);
    throw getErrorMessage(error); // Throw the extracted string
  }
};

const blogService = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;