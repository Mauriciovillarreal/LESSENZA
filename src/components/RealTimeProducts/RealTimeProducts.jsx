import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import './RealTimeProducts.css'; // Importa los estilos
import { AuthContext } from '../../AuthContext/AuthContext'; // Asegúrate de tener este contexto configurado

// Inicializa la conexión de Socket.io
const socket = io('https://lessenza-api.onrender.com');

const RealTimeProducts = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        brands: '',
        name: '',
        description: '',
        code: '',
        price: '',
        status: false,
        stock: '',
        category: '',
        thumbnails: ''
    });
    const [deleteProductId, setDeleteProductId] = useState('');
    const { user, loading } = useContext(AuthContext); // Usa el contexto para obtener el usuario

    // Cargar productos al montar el componente y escuchar las actualizaciones
    useEffect(() => {
        if (!loading) {
            // Escuchar las actualizaciones de productos
            socket.on('update-products', (products) => {
                setProducts(products);
            });

            // Emitir evento para obtener productos al montar el componente
            socket.emit('get-products');

            // Limpiar eventos al desmontar el componente
            return () => {
                socket.off('update-products');
            };
        }
    }, [loading]);

    // Manejar cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    // Manejar la adición de un nuevo producto
    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            ...form,
            price: parseFloat(form.price),
            stock: parseInt(form.stock),
        };
        socket.emit('add-product', newProduct);
        setForm({
            brands: '',
            name: '',
            description: '',
            code: '',
            price: '',
            status: false,
            stock: '',
            category: '',
            thumbnails: ''
        });
    };

    // Manejar la eliminación de un producto
    const handleDeleteProduct = (e) => {
        e.preventDefault();
        socket.emit('delete-product', deleteProductId);
        setDeleteProductId('');
    };

    // Mostrar un mensaje si no hay productos
    const renderProducts = () => {
        if (products.length === 0) {
            return <p>No hay productos disponibles</p>;
        }

        return (
            <ul id="products-list" className="row">
                {products.map((product) => (
                    <li key={product._id} className="col">
                        <h2>{product.brands}</h2>
                        <h3>{product.name}</h3>
                        <div>Id: {product._id}</div>
                        <div>Precio: ${product.price}</div>
                        <div>Stock: {product.stock}</div>
                    </li>
                ))}
            </ul>
        );
    };

    // Renderizar el formulario solo si el usuario es admin o premium
    const renderProductManagement = () => {
        if (!user || (user.role !== 'admin' && user.role !== 'premium')) {
            return <p>No tienes permisos para agregar o eliminar productos</p>;
        }

        return (
            <div className="operateProducts">
                <h3>Agregar Productos</h3>
                <form id="add-product-form" onSubmit={handleAddProduct}>
                    <label>Marcas</label>
                    <input
                        type="text"
                        id="brands"
                        className="form-control"
                        value={form.brands}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Nombre</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Descripción</label>
                    <input
                        type="text"
                        id="description"
                        className="form-control"
                        value={form.description}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Código</label>
                    <input
                        type="text"
                        id="code"
                        className="form-control"
                        value={form.code}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Precio</label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        value={form.price}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Stock</label>
                    <input
                        type="number"
                        id="stock"
                        className="form-control"
                        value={form.stock}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Categoría</label>
                    <input
                        type="text"
                        id="category"
                        className="form-control"
                        value={form.category}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Thumbnails</label>
                    <input
                        type="text"
                        id="thumbnails"
                        className="form-control"
                        value={form.thumbnails}
                        onChange={handleInputChange}
                    />
                    <div>
                        <label>Status</label>
                        <input
                            type="checkbox"
                            id="status"
                            checked={form.status}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary btn-sm bg-black col btnAdd">
                        AGREGAR
                    </button>
                </form>

                <h3>Eliminar Productos</h3>
                <form id="delete-product-form" onSubmit={handleDeleteProduct}>
                    <label>ID del Producto</label>
                    <input
                        type="text"
                        id="delete-product-id"
                        className="form-control"
                        value={deleteProductId}
                        onChange={(e) => setDeleteProductId(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-secondary btn-sm bg-black col btnAdd">
                        ELIMINAR
                    </button>
                </form>
            </div>
        );
    };

    return (
        <main>
            <h1 className="text-start h6 container">Productos en Tiempo Real</h1>
            <div className="realTimeProducts container">
                <div>
                    {renderProducts()}
                </div>
                {renderProductManagement()}
            </div>
        </main>
    );
};

export default RealTimeProducts;
