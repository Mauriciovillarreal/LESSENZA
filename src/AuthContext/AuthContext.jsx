import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Estado de carga

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('https://lessenza-api.onrender.com/api/sessions/current', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
   
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error('Failed to fetch current user');
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCurrentUser();
  }, []);
  

  const handleGitHubLogin = async () => {
    try {
      const response = await fetch('https://lessenza-api.onrender.com/api/sessions/current', { 
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const register = async (formData) => {
    try {
      const response = await fetch('https://lessenza-api.onrender.com/api/sessions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {

        setUser(data.user);
        window.location.href = '/';
      } else {
        console.error('Error registering user:', data.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  logout = async () => {
    try {
      console.log('Logout: Iniciando solicitud para cerrar sesión');
      const response = await fetch('https://lessenza-api.onrender.com/api/sessions/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
  
      if (response.ok) {
        console.log('Logout: Sesión cerrada con éxito');
        setUser(null); // Actualizar el estado del usuario a null
      } else {
        const errorData = await response.json();
        console.error('Logout: Error al cerrar sesión:', errorData.error || 'Error desconocido');
        throw new Error(errorData.error || 'Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Logout: Excepción capturada al cerrar sesión:', error.message);
      throw error; // Relanza el error si es necesario manejarlo en otro lugar
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, handleGitHubLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
