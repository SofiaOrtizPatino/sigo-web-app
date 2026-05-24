import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login        from './pages/Login';
import Dashboard    from './pages/Dashboard';
import Bienes       from './pages/Bienes';
import NuevoBien    from './pages/NuevoBien';
import Dependencias from './pages/Dependencias';
import Reportes     from './pages/Reportes';
import MainLayout   from './layouts/MainLayout';

// Nivel 1: verifica que haya sesión activa
const ProtectedRoute = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  return usuario ? children : <Navigate to='/login' replace />;
};

// Nivel 2: verifica que el rol tenga acceso al módulo
const RoleRoute = ({ roles, children }) => {
  const { usuario } = useContext(AuthContext);
  return roles.includes(usuario?.rol)
    ? children
    : <Navigate to='/' replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/'
          element={<ProtectedRoute><MainLayout /></ProtectedRoute>}
        >
          <Route index element={<Dashboard />} />
          {/* Los tres roles pueden ver el inventario */}
          <Route path='bienes' element={<Bienes />} />
          {/* Solo admin y funcionario pueden registrar bienes */}
          <Route path='bienes/nuevo' element={
            <RoleRoute roles={['ADMIN', 'FUNCIONARIO']}>
              <NuevoBien />
            </RoleRoute>
          } />
          <Route path='dependencias' element={<Dependencias />} />
          {/* Solo auditor y admin acceden a reportes */}
          <Route path='reportes' element={
            <RoleRoute roles={['ADMIN', 'AUDITOR']}>
              <Reportes />
            </RoleRoute>
          } />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}