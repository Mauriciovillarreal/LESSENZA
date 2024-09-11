import React from 'react';
import { RealTimeProductsWidget } from '../RealTimeProductsWidget/RealTimeProductsWidget';
import { Link, useNavigate } from 'react-router-dom';  // Añadir useNavigate
import './UserInfoWidget.css'
import { AdminUserManagementWidget } from '../AdminUserManagementWdiget/AdminUserManagementWidget';

const UserInfoWidget = ({ user, handleLogout }) => {
    const navigate = useNavigate();  // Crear el hook de navegación

    const handleLogoutClick = () => {
        handleLogout();  // Llamar a la función de logout
        navigate('/login');  // Redirigir a la página de login
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
                <button className='btnUser' onClick={handleLogoutClick}>Salir</button> {/* Usar handleLogoutClick */}
            </div>
        </div>
    );
};

export default UserInfoWidget;
