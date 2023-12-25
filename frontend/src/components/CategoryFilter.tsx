import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import config from '../config'; // Adjust the import path as needed
import { Category } from '../types/types';


interface CategoryFilterProps {
    onFilterChange: (value: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onFilterChange }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Fetch categories from the backend
        axios.get(`${config.API_URL}/api/categories`) // Adjust API endpoint as needed
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories', error));
    }, []);

    return (
        <Box>
            <Select
                defaultValue=""
                onChange={(e) => onFilterChange(e.target.value)}
                displayEmpty
            >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                    <MenuItem key={category.id} value={category.name}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

export default CategoryFilter;
