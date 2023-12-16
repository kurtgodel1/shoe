// HomePage.tsx
import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/homepage/HeroSection';
import FeaturedProducts from '../components/homepage/FeaturedProducts';
import CategoriesSection from '../components/homepage/CategoriesSection';
import PromotionalBanner from '../components/homepage/PromotionalBanner';
import TestimonialsSection from '../components/homepage/TestimonialsSection';
import BlogSection from '../components/homepage/BlogSection';
import NewsletterSignUp from '../components/homepage/NewsletterSignUp';
import Footer from '../components/homepage/Footer';
import AnimateOnScroll from '../components/homepage/AnimateOnScroll';

const HomePage: React.FC = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <HeroSection />
            <AnimateOnScroll><FeaturedProducts /></AnimateOnScroll>
            <AnimateOnScroll><CategoriesSection /></AnimateOnScroll>
            <AnimateOnScroll><PromotionalBanner /></AnimateOnScroll>
            <AnimateOnScroll><TestimonialsSection /></AnimateOnScroll>
            <AnimateOnScroll><BlogSection /></AnimateOnScroll>
            <AnimateOnScroll><NewsletterSignUp /></AnimateOnScroll>
            <AnimateOnScroll><Footer /></AnimateOnScroll>
            {/* You can add more sections here like categories, promotions, etc. */}
        </Box>
    );
};

export default HomePage;
