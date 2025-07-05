import axios from 'axios';

const nodeApi = axios.create({
  baseURL: 'https://api.tpo.getflytechnologies.com/event',
});

nodeApi.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage or another storage mechanism
    const token = localStorage.getItem('token');

    // If token exists, add it to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default nodeApi;