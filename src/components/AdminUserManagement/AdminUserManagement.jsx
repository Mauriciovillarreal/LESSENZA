import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';
import axiosInstance from '../../AxiosInstance/AxiosInstance';
import { Container, Table } from 'react-bootstrap';
import "./AdminUserManagement.css"

const AdminUserManagement = () => {
    const { user, loading } = useContext(AuthContext); // Obtener el usuario autenticado y el estado de carga
    const [users, setUsers] = useState([]); // Inicializar como un array vacío
    const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para edición
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Usuario desde AuthContext:", user); // Debug: Verificar el valor de user

        if (!loading) {
            if (!user || user.role !== 'admin') {
                // Si no es admin, redirigir al inicio o a una página de error
                alert('No tienes permisos para acceder a esta página.');
                navigate('/');
            } else {
                console.log("El usuario es admin, cargando usuarios...");
                fetchUsers();
            }
        }
    }, [loading, user]);


    // Función para obtener todos los usuarios
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/api/users');

            console.log("Respuesta completa de la API:", response);

            // Ajusta según la estructura de la respuesta
            const usuarios = response.data?.data || response.data || [];
            console.log("Usuarios obtenidos desde la API:", usuarios);
            setUsers(usuarios);

        } catch (err) {
            console.error("Error al obtener usuarios:", err);
            setError('Error al cargar los usuarios.');
            setUsers([]);
        }
    };

    // Función para seleccionar un usuario para editar o cambiar el rol
    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    // Función para cambiar el rol del usuario seleccionado
    const handleRoleChange = async (selectedUser) => {
        if (!selectedUser) return;

        try {
            const response = await axiosInstance.post(`/api/users/premium/${selectedUser._id}`);
            alert('Rol del usuario actualizado.');
            setSelectedUser(response.data.data);
            fetchUsers(); // Refrescar la lista de usuarios después del cambio
        } catch (err) {
            alert('Error al actualizar el rol del usuario.');
        }
    };

    // Función para eliminar al usuario seleccionado
    const handleDeleteUser = async (selectedUser) => {
        if (!selectedUser) return;

        const confirmDelete = window.confirm(`¿Estás seguro de eliminar al usuario ${selectedUser.first_name}?`);
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/api/users/${selectedUser._id}`);
                alert('Usuario eliminado con éxito.');
                fetchUsers(); // Refrescar la lista de usuarios después de la eliminación
            } catch (err) {
                alert('Error al eliminar el usuario.');
            }
        }
    };

    // Debug: Verificar el estado de users antes de renderizar la lista
    console.log("Estado de users en render:", users);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container className='ContainerUser'>
            <h1>Gestión de Usuarios</h1>

            {/* Tabla de Usuarios */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.first_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleRoleChange(user)}>
                                        {user.role === 'user' ? 'Cambiar a Premium' : 'Cambiar a Usuario'}
                                    </button>
                                    <button onClick={() => handleDeleteUser(user)} >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay usuarios disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminUserManagement;
