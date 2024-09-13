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
          localStorage.setItem('user', JSON.stringify(data.user)); // Guardar usuario en localStorage
        } else {
          console.error('Failed to fetch current user');
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Restaurar usuario de localStorage si está disponible
    } else {
      fetchCurrentUser(); // Si no hay usuario en localStorage, obtenerlo del backend
    }
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

  const logout = async () => {
    try {
      const response = await fetch('https://lessenza-api.onrender.com/api/sessions/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
  
      if (response.ok) {
        setUser(null);
        localStorage.removeItem('user'); // Eliminar usuario de localStorage al cerrar sesión
      } else {
        console.error('Error logging out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, handleGitHubLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
