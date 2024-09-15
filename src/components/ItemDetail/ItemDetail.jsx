import React, { useContext, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { CartContext } from '../../CartProvider/CartProvider';
import "./ItemDetail.css"

export const ItemDetail = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return null;
    }

    // Calcula el valor de cada cuota
    const installment = (product.price / 3).toFixed(2); // Dividimos el precio por 3 y lo redondeamos a 2 decimales

    const handleAddToCart = () => {
        addToCart(product._id);
    };

    return (
        <Container>
            <h2>{product.name}</h2>
            <div className='containerDetail'>
                <div className='imageContainer'>
                    <img src={product.thumbnails} alt={product.name} />
                </div>
                <div className='productDetail'>
                    <h4>{product.brands}</h4>
                    <hr />
                    <h5 className='category'>{product.category}</h5>
                    <h5 className='code'>Código: {product.code}</h5>
                    <h5>${product.price}</h5>
                    <img className='tarjetas' src="./img/tarjetas.png" alt="" />
                    {/* Cartel de 3 cuotas sin interés */}
                    <div className="cuotas">
                    <h6>hasta 3 cuotas de ${installment} sin interés</h6>

                    </div>
                    <hr />
                    <button onClick={handleAddToCart}>
                        COMPRAR
                    </button>
                </div>
            </div>
            <hr />
            <h5>Descripción</h5>
            <p>{product.description}</p>
        </Container>
    );
};
