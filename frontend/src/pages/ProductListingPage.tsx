// ProductListingPage.tsx
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard'; // Update the import path as needed
import { Product } from '../types/types';
import axios from 'axios';
import config from '../config';

const ProductListingPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get<Product[]>(`${config.API_URL}/api/products`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products', error));
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ margin: 2 }}>
                All Products
            </Typography>
            <Grid container spacing={2}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductListingPage;
