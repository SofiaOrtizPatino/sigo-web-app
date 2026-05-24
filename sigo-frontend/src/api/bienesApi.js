import sigaiApi from './axiosConfig';

// Si dependenciaId es null trae todos los bienes (admin/auditor)
// Si tiene valor filtra por dependencia (funcionario)
export const obtenerBienes = (dependenciaId = null) => {
  const params = dependenciaId ? { dependencia: dependenciaId } : {};
  return sigaiApi.get('/bienes', { params });
};

export const obtenerBien       = (id)        => sigaiApi.get(`/bienes/${id}`);
export const crearBien         = (data)      => sigaiApi.post('/bienes', data);
export const cambiarEstadoBien = (id, estado) =>
  sigaiApi.patch(`/bienes/${id}/estado`, { estado });

// Historial de traslados entre dependencias
export const obtenerMovimientos = (bienId) =>
  sigaiApi.get('/movimientos', { params: { bien: bienId } });

// Reporte consolidado para la Contraloría (solo rol AUDITOR)
export const obtenerReporteInventario = (filtros) =>
  sigaiApi.get('/reportes/inventario', { params: filtros });