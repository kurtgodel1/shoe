// HomePage.tsx
import React from 'react';
import { Box } from '@mui/material';
import FeaturedProducts from '../components/homepage/FeaturedProducts';
import CategoriesSection from '../components/homepage/CategoriesSection';
import AnimateOnScroll from '../components/homepage/AnimateOnScroll';
import './HomePage.css';
import ShuffleHero from '../components/homepage/ShuffleHero';

const HomePage: React.FC = () => {

    return (
        <Box sx={{ flexGrow: 1, width: '100%'  }}>
            <ShuffleHero />
            <AnimateOnScroll className="section"><FeaturedProducts /></AnimateOnScroll>
            <AnimateOnScroll className="section"><CategoriesSection /></AnimateOnScroll>
            {/* You can add more sections here like categories, promotions, etc. */}
        </Box>
    );
};

export default HomePage;
