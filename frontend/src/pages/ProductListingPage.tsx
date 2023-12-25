import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Typography, Box } from '@mui/material';
import config from '../config';
import { Product } from '../types/types';
import CategoryFilter from '../components/CategoryFilter';
import ImageSlider from '../components/ImageSlider';

const ProductListingPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/api/products`, {
                    params: { category: selectedCategory }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const handleFilterChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <CategoryFilter onFilterChange={handleFilterChange} />
            <Typography variant="h4" sx={{ margin: 2 }}>
                Products
            </Typography>
            <ImageSlider products={products} />
        </Box>
    );
};

export default ProductListingPage;
