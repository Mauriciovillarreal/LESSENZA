import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ItemDetailContainer.css";
import { ItemDetail } from '../ItemDetail/ItemDetail';

const getProductById = async (pid) => {
    try {
        const response = await fetch(`https://lessenza-api.onrender.com/api/products/${pid}`).then(res => res.json());
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const ItemDetailContainer = () => {
    const { pid } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(pid);
            setProduct(productData);
        };
        fetchProduct();
    }, [pid]);

    return (
        <div className='containerProductDetail'>
            <ItemDetail product={product} />
        </div>
    );
};
