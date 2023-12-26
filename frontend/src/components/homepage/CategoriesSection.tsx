// CategoriesSection.tsx
import React from 'react';
import { Typography } from '@mui/material';
import { Category } from '../../types/types';
import axios from 'axios';
import config from '../../config';
import { useState, useEffect } from 'react';
import CategorySlider from '../CategorySlider';


const CategoriesSection : React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Example API calls, replace with your actual API endpoints
        axios.get<Category[]>(`${config.API_URL}/api/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories', error));
    }, []);


    return (
        <div>
            <Typography variant="h4" sx={{ margin: 2 }}>
                Shop by Category
            </Typography>
            <CategorySlider categories={categories} />
        </div>
    );
};

export default CategoriesSection;
