// HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard'; // Update the import path as needed
import { Product, Category } from '../types/types';
import axios from 'axios';
import config from '../config';

const HomePage: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Example API calls, replace with your actual API endpoints
        axios.get<Product[]>(`${config.API_URL}/api/products`)
            .then(response => setFeaturedProducts(response.data))
            .catch(error => console.error('Error fetching featured products', error));

        axios.get<Category[]>(`${config.API_URL}/api/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories', error));
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ margin: 2 }}>
                Featured Products
            </Typography>
            <Grid container spacing={2}>
                {featuredProducts.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
            {/* You can add more sections here like categories, promotions, etc. */}
        </Box>
    );
};

export default HomePage;
