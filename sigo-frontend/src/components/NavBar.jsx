import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const rol = usuario?.rol;

  return (
    <nav>
      <span>Bienvenido/a, {usuario?.nombre}</span>
      <span className='rol-badge'>{rol}</span>

      {/* Todos los roles ven el inventario */}
      <a href='/bienes'>Inventario</a>

      {/* Solo admin y funcionario pueden registrar bienes */}
      {(rol === 'ADMIN' || rol === 'FUNCIONARIO') && (
        <a href='/bienes/nuevo'>Registrar bien</a>
      )}

      {/* Solo admin y auditor acceden a reportes */}
      {(rol === 'ADMIN' || rol === 'AUDITOR') && (
        <a href='/reportes'>Reportes</a>
      )}

      <a href='/dependencias'>Dependencias</a>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </nav>
  );
};

export default NavBar;