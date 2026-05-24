import React from 'react';

const ESTILOS_ESTADO = {
  ACTIVO:        { background: '#d4edda', color: '#155724' },
  MANTENIMIENTO: { background: '#fff3cd', color: '#856404' },
  BAJA:          { background: '#f8d7da', color: '#721c24' },
};

const BienCard = ({ codigo, descripcion, dependencia, estado, fechaIngreso }) => {
  const estilo = ESTILOS_ESTADO[estado] || {};
  return (
    <div className='bien-card'>
      <span className='codigo'>{codigo}</span>
      <h4>{descripcion}</h4>
      <p><strong>Dependencia:</strong> {dependencia}</p>
      <p><strong>Ingreso:</strong> {fechaIngreso}</p>
      <span className='badge' style={estilo}>{estado}</span>
    </div>
  );
};

export default BienCard;