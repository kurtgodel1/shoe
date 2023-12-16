// ProductCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Product } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Ensure this is imported
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (e: React.MouseEvent) => {
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
                height="500"
                image={product.image}
                alt={product.name}
            />
            <CardContent className="card-content">
                <Typography gutterBottom variant="h6" component="h2" className="product-name">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="product-description">
                    {product.price}
                </Typography>
            </CardContent>
            <div className="add-to-cart-button">
                <Button variant="contained" size="small" onClick={handleAddToCart} startIcon={<ShoppingCartIcon />}>Add to Cart</Button>
            </div>
        </Card>
    );
};

export default ProductCard;
