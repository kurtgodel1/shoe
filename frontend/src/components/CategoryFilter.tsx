import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import config from '../config'; // Adjust the import path as needed
import { Category } from '../types/types';


interface CategoryFilterProps {
    selectedCategory : string;
    onFilterChange: (value: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onFilterChange }) => {
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
        <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '10px 0' }}>
      <Button 
        variant={selectedCategory === '' ? 'contained' : 'outlined'} 
        onClick={() => onFilterChange('')}
        sx={{ margin: '0 10px' }}
      >
        All Categories
      </Button>
      {categories.map(category => (
        <Button 
          key={category.id} 
          variant={selectedCategory === category.name ? 'contained' : 'outlined'} 
          onClick={() => onFilterChange(category.name)}
          sx={{ margin: '0 10px' }}
        >
          {category.name}
        </Button>
      ))}
    </Box>
    );
};

export default CategoryFilter;
