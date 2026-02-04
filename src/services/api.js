import axios from 'axios';

const API_BASE_URL = 'https://gastosapi-ysyl.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Aquí intercepto la petición para agregar mi token JWT si estoy logueado (si existe)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;