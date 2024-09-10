import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://lessenza-api.onrender.com',
  // baseURL: 'https://lessenza-api.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'

  }
});

export default axiosInstance;
