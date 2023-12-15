// ProductDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';
import { Product } from '../types/types';
import config from '../config';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get<Product>(`${config.API_URL}/api/products/${productId}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product details', error));
    }, [productId]);

    if (!product) {
        return <Typography>Loading...</Typography>; // Or some loading component
    }


    const handleAddToCart = () => {
      console.log('Adding to cart');
      dispatch(addToCart(product));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Typography variant="h4">{product.name}</Typography>
                        <Typography variant="body1" color="text.secondary">
                            {product.description}
                        </Typography>
                        {/* Add more product details as needed */}
                        <Typography variant="h6" color="text.primary">
                            Price: ${product.price}
                        </Typography>
                        <Button onClick={handleAddToCart} variant="contained" color="primary" sx={{ mt: 2 }}>
                            Add to Cart
                        </Button>
                        {/* Implement add to cart functionality */}
                    </CardContent>
                </Grid>
            </Grid>
            {/* You can add a reviews section here */}
        </Box>
    );
};

export default ProductDetailPage;
