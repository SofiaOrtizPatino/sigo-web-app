import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  return (
    <nav>
      <span>Bienvenido/a, {usuario?.nombre}</span>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </nav>
  );
};

export default NavBar;