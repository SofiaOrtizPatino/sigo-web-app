import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  const iniciarSesion = useCallback(async (credenciales) => {
    const resp = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales),
    });
    const { user, token } = await resp.json();
    setUsuario(user);
    setToken(token);
    localStorage.setItem('sigo_token', token);
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('sigo_token');
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};