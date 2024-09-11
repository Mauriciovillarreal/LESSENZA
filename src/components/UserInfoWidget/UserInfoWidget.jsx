import React, { useContext } from 'react';
import { RealTimeProductsWidget } from '../RealTimeProductsWidget/RealTimeProductsWidget';
import { Link, useNavigate } from 'react-router-dom';
import './UserInfoWidget.css';
import { AdminUserManagementWidget } from '../AdminUserManagementWdiget/AdminUserManagementWidget';
import { AuthContext } from '../../AuthContext/AuthContext';

const UserInfoWidget = () => {
    const { user, logout } = useContext(AuthContext);  // Usar el contexto
    const navigate = useNavigate();  // Crear el hook de navegación

    const handleLogoutClick = async () => {
        try {
            await logout();  // Llamar a la función de logout desde el contexto
            navigate('/login');  // Redirigir a la página de login
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <div className="containerUser">
            <div className='userInfo'>
                <h5>{user.first_name}</h5>
                <Link to="/profil">Mi perfil ► </Link>
                <div className="role">
                    <h3>{user.role}</h3>
                </div>
            </div>
            <div className='containerBtn'>
                {user.role === 'premium' && <RealTimeProductsWidget />}
                {user.role === 'admin' && <RealTimeProductsWidget />}
                {user.role === 'admin' && <AdminUserManagementWidget />}
                <hr />
                <button className='btnUser' onClick={handleLogoutClick}>Salir</button>
            </div>
        </div>
    );
};

export default UserInfoWidget;
