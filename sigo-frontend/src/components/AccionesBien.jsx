import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AccionesBien = ({ bienId, onCambiarEstado }) => {
  const { usuario } = useContext(AuthContext);
  const rol = usuario?.rol;

  return (
    <div className='acciones'>
      {/* Admin y funcionario pueden enviar a mantenimiento */}
      {(rol === 'ADMIN' || rol === 'FUNCIONARIO') && (
        <button onClick={() => onCambiarEstado(bienId, 'MANTENIMIENTO')}>
          Enviar a mantenimiento
        </button>
      )}

      {/* Solo el admin puede dar de baja un bien público */}
      {rol === 'ADMIN' && (
        <button
          className='btn-baja'
          onClick={() => onCambiarEstado(bienId, 'BAJA')}
        >
          Dar de baja
        </button>
      )}

      {/* El auditor solo puede consultar el historial */}
      {rol === 'AUDITOR' && (
        <button>Ver historial de movimientos</button>
      )}
    </div>
  );
};

export default AccionesBien;