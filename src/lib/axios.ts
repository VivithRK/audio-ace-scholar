
import axios from 'axios';

// Create axios instance with relative URL that works in both development and deployed environments
const instance = axios.create({
  baseURL: '/api/',  // Use relative path for deployment
  timeout: 30000,    // Increased timeout for audio processing
});

// Add response interceptor to handle common errors
instance.interceptors.response.use(
  response => {
    console.log('API Success:', response.config.url, response.status);
    return response;
  },
  error => {
    // Log detailed error information for debugging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
        url: error.config?.url
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response:', {
        request: error.request,
        url: error.config?.url
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Error:', error.message, error.config?.url);
    }
    
    return Promise.reject(error);
  }
);

export default instance;
