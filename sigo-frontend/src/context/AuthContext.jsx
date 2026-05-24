import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Recupera la sesión guardada si el funcionario ya había iniciado sesión
  const sesionGuardada = JSON.parse(localStorage.getItem('sigai_sesion'));
  const [usuario, setUsuario] = useState(sesionGuardada?.usuario || null);
  const [token, setToken]     = useState(sesionGuardada?.token   || null);

  const iniciarSesion = useCallback(async (credenciales) => {
    const resp = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales),
    });
    if (!resp.ok) throw new Error('Credenciales inválidas');
    const { usuario, token } = await resp.json();
    setUsuario(usuario); // { id, nombre, rol: 'ADMIN'|'FUNCIONARIO'|'AUDITOR' }
    setToken(token);
    localStorage.setItem('sigai_sesion', JSON.stringify({ usuario, token }));
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('sigai_sesion');
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};