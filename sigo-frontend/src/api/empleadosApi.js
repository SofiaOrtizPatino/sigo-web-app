import sigoApi from './axiosConfig';

export const obtenerEmpleados   = ()         => sigoApi.get('/empleados');
export const buscarEmpleadosAPI = (termino)  => sigoApi.get(`/empleados?q=${termino}`);
export const crearEmpleado      = (data)     => sigoApi.post('/empleados', data);
export const actualizarEmpleado = (id, data) => sigoApi.put(`/empleados/${id}`, data);
export const eliminarEmpleado   = (id)       => sigoApi.delete(`/empleados/${id}`);