import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tpo.getflytechnologies.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
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

let isSessionExpired = false

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    // Reset the flag on a successful response
    isSessionExpired = false;
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (!isSessionExpired) {
        // Only trigger alert and reload once
        alert("Your session has expired! Login again");
        localStorage.clear();
        isSessionExpired = true; // Set the flag to prevent further alerts
        window.location.reload();
      }
    } else {
      console.error("An error occurred:", error.message);
    }

    return Promise.reject(error);
  }
);

api.defaults.timeout = 600000;

export default api;