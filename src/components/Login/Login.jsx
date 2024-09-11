// LoginForm.jsx
import { AuthContext } from '../../AuthContext/AuthContext';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, handleGitHubLogin } = useContext(AuthContext);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
  
    try {
      console.log('Sending login request with email:', email);
      const response = await fetch('https://lessenza-api.onrender.com/api/sessions/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
  
      console.log('Response received:', response);
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Response data:', data);
  
        if (data.error) {
          console.log('Login error:', data.error);
          setError(data.error);
        } else {
          login(data);
          console.log('Login successful, redirecting...');
          setTimeout(() => {
            navigate('/'); // Redirigir usando useNavigate
          }, 2000);
        }
      } else {
        const text = await response.text();
        console.log('Unexpected response format:', text);
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.log('Error during login process:', error);
      setError(`Error al iniciar sesión: ${error.message}`);
    }
  };
  
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <p>Iniciar sesión</p>
        <label className="uperCase">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="control"
        />
        <label className="uperCase">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="control"
        />
        <p>¿No tenés cuenta aún? <Link to="/register">Crear cuenta</Link></p>
        <p>¿Olvidaste tu contraseña? <Link to="/forgot-password">Recuperar contraseña</Link></p>
        <hr />
        <button type="submit" className="btnLogin">LOGIN</button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="containerBtnGH">
        <a href="https://lessenza-api.onrender.com/api/sessions/github" className="btnGitHub" onClick={handleGitHubLogin}>
          <img src="/img/github.png" width="50px" alt="" /> Sign up with GitHub
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
