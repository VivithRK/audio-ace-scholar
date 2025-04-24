
import axios from 'axios';

// Create axios instance with relative URL that works in both development and deployed environments
const instance = axios.create({
  baseURL: '/api/',  // Use relative path for deployment
  timeout: 30000, // Increased timeout for audio processing
});

// Add response interceptor to handle common errors
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default instance;
