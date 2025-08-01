// ai-sales-frontend/src/api.ts
import axios, { AxiosInstance } from 'axios';

// Determine the backend URL based on environment variables
const backendUrl: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api: AxiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to include the JWT token in every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      console.warn('Unauthorized request. Redirecting to login.');
      // In a real app, you'd use react-router-dom's navigate here,
      // but for a global interceptor, it's more complex.
      // For now, if this happens, the user will just need to manually go to login.
    }
    return Promise.reject(error);
  }
);

export default api; // <<< THIS LINE IS CRUCIAL
