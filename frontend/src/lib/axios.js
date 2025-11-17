import axios from 'axios';

// Create an Axios instance with default configuration
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3000/api' : '/api',
    withCredentials: true, // Include cookies in requests
});