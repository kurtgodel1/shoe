// ProductCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Product } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Ensure this is imported

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevents the click event from reaching the card
        dispatch(addToCart(product));
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <Card className="product-card" onClick={handleCardClick}>
            <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" className="product-name">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="product-description">
                    {product.description}
                </Typography>
            </CardContent>
            <div className="add-to-cart-button">
                <Button size="small" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
        </Card>
    );
};

export default ProductCard;
