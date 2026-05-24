import axios from 'axios';

const sigaiApi = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Agrega el JWT en cada petición saliente
sigaiApi.interceptors.request.use((config) => {
  const sesion = JSON.parse(localStorage.getItem('sigai_sesion'));
  if (sesion?.token) config.headers.Authorization = `Bearer ${sesion.token}`;
  return config;
});

// Maneja errores de autenticación y autorización de forma centralizada
sigaiApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token vencido: cierra sesión y redirige al login
      localStorage.removeItem('sigai_sesion');
      window.location.href = '/login';
    }
    if (error.response?.status === 403) {
      // El rol del funcionario no tiene permiso para esta operación
      return Promise.reject({ mensaje: 'No tiene permisos para esta acción' });
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default sigaiApi;