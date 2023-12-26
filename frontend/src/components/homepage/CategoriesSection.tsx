// CategoriesSection.tsx
import React from 'react';
import { Typography } from '@mui/material';
import { Category } from '../../types/types';
import axios from 'axios';
import config from '../../config';
import { useState, useEffect } from 'react';
import CategorySlider from '../CategorySlider';
import CategoryIcon from '@mui/icons-material/Category';
import ImageSliderSkeleton from '../ImageSliderSkeleton';


const CategoriesSection : React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        // Example API calls, replace with your actual API endpoints
        axios.get<Category[]>(`${config.API_URL}/api/categories`)
        .then(response => {
            setCategories(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching featured products', error);
            setLoading(false);
        });
    }, []);


    return (
        <div>
            <div className="mb-10" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ margin: 2 }}>
                <CategoryIcon/> Category
            </Typography>
            </div>
            {loading ? (
                <ImageSliderSkeleton />
            ) : (
                <CategorySlider categories={categories} />
                )}
        </div>
    );
};

export default CategoriesSection;
