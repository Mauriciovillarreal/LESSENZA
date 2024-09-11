import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!form.first_name || !form.last_name || !form.email || !form.age || !form.password) {
            toast.error('Por favor, complete todos los campos.', {
                position: "bottom-left",
                autoClose: 4000,
                style: { backgroundColor: "black", color: "white", borderRadius: "0px" }
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('https://lessenza-api.onrender.com/api/sessions/register', form, {
                withCredentials: true, // Enviar cookies con la solicitud si es necesario
            });

            if (response.status === 200) {
                toast.success('Registro exitoso, redirigiendo a página login...', {
                    position: "bottom-left",
                    autoClose: 4000,
                    style: {
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "0px"
                    },
                });

                // Esperar 4 segundos antes de redirigir
                setTimeout(() => {
                    navigate('/login');
                }, 4000); // 4 segundos
            } else {
                setError(response.data.message || 'Error en el registro');
            }
        } catch (err) {
            // Manejar errores específicos del servidor, como el email ya registrado o fallos de validación.
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Fallo en el registro. Inténtelo de nuevo más tarde.');
            }
        }
    };

    return (
        <main className="mainLogin">
            <div className="bg">
                <div className="login">
                    <form onSubmit={handleSubmit}>
                        <p>Crear cuenta</p>
                        <label className="uperCase">Nombre</label>
                        <input
                            type="text"
                            name="first_name"
                            className="control"
                            value={form.first_name}
                            onChange={handleChange}
                        />
                        <label className="uperCase">Apellido</label>
                        <input
                            type="text"
                            name="last_name"
                            className="control"
                            value={form.last_name}
                            onChange={handleChange}
                        />
                        <label className="uperCase">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="control"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <label className="uperCase">Edad</label>
                        <input
                            type="number"
                            name="age"
                            className="control"
                            value={form.age}
                            onChange={handleChange}
                        />
                        <label className="uperCase">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="control"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <span>
                            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                        </span>
                        <hr />
                        <button type="submit" className="btnLogin">REGISTRARSE</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
};

export default Register;