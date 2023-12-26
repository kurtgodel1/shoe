// HomePage.tsx
import React from 'react';
import { Box } from '@mui/material';
import FeaturedProducts from '../components/homepage/FeaturedProducts';
import CategoriesSection from '../components/homepage/CategoriesSection';
import PromotionalBanner from '../components/homepage/PromotionalBanner';
import TestimonialsSection from '../components/homepage/TestimonialsSection';
import BlogSection from '../components/homepage/BlogSection';
import AnimateOnScroll from '../components/homepage/AnimateOnScroll';
import './HomePage.css';
import ShuffleHero from '../components/homepage/ShuffleHero';
import {Example} from '../components/MouseImageTrail';


const HomePage: React.FC = () => {

    return (
        <Box sx={{ flexGrow: 1, width: '100%'  }}>
            <ShuffleHero />
            <Example />
            <AnimateOnScroll className="section"><FeaturedProducts /></AnimateOnScroll>
            <AnimateOnScroll className="section"><CategoriesSection /></AnimateOnScroll>
            <AnimateOnScroll className="section"><PromotionalBanner /></AnimateOnScroll>
            <AnimateOnScroll className="section"><TestimonialsSection /></AnimateOnScroll>
            <AnimateOnScroll className="section"><BlogSection /></AnimateOnScroll>
            {/* You can add more sections here like categories, promotions, etc. */}
        </Box>
    );
};

export default HomePage;
