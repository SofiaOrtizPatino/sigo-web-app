import React from 'react';

const EmpleadoCard = ({ nombre, cargo, email, activo }) => {
  return (
    <div className={`card ${activo ? 'activo' : 'inactivo'}`}>
      <h3>{nombre}</h3>
      <p><strong>Cargo:</strong> {cargo}</p>
      <p><strong>Email:</strong> {email}</p>
      <span className='badge'>
        {activo ? 'Activo' : 'Inactivo'}
      </span>
    </div>
  );
};

export default EmpleadoCard;