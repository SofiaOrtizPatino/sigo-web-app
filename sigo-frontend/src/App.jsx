import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login      from './pages/Login';
import Dashboard  from './pages/Dashboard';
import Empleados  from './pages/Empleados';
import Reportes   from './pages/Reportes';
import MainLayout from './layouts/MainLayout';

const ProtectedRoute = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  return usuario ? children : <Navigate to='/login' replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={<ProtectedRoute><MainLayout /></ProtectedRoute>}
        >
          <Route index            element={<Dashboard />} />
          <Route path='empleados' element={<Empleados />} />
          <Route path='reportes'  element={<Reportes />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}