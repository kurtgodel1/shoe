// FeaturedProducts.tsx
import { Product} from '../../types/types';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Typography } from '@mui/material';
import './FeaturedProducts.css'
import ImageSlider from '../ImageSlider';
import ImageSliderSkeleton from '../ImageSliderSkeleton';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


const FeaturedProducts : React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Example API calls, replace with your actual API endpoints
        axios.get<Product[]>(`${config.API_URL}/api/products`)
            .then(response => {
                setFeaturedProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching featured products', error);
                setLoading(false);
            });

    }, []);

    const handleSeeMoreClick = () => {
        navigate('/products'); // Adjust the route as needed
    };

    return (
        <div>
            <div className="mb-10" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4"> <InstagramIcon /> Featured Products</Typography>
                <Button onClick={handleSeeMoreClick}>See More <KeyboardDoubleArrowRightIcon /> </Button>
            </div>
            {loading ? (
                <ImageSliderSkeleton />
            ) : (
                <ImageSlider products={featuredProducts} />
            )}
        </div>
    );
};

export default FeaturedProducts;
