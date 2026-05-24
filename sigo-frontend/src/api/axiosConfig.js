import axios from 'axios';

const sigoApi = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Agrega el token JWT en cada petición saliente
sigoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('sigo_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Manejo centralizado de errores
sigoApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sigo_token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default sigoApi;