import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',  // Django development server URL
  timeout: 30000, // Increased timeout for audio processing
});

export default instance;
