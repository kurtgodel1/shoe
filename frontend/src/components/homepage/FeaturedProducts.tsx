// FeaturedProducts.tsx
import { Product} from '../../types/types';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from '@mui/material';
import './FeaturedProducts.css'
import ImageSlider from '../ImageSlider';


const FeaturedProducts : React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Example API calls, replace with your actual API endpoints
        axios.get<Product[]>(`${config.API_URL}/api/products?limit=6`)
            .then(response => setFeaturedProducts(response.data))
            .catch(error => console.error('Error fetching featured products', error));

    }, []);

    const handleSeeMoreClick = () => {
        navigate('/products'); // Adjust the route as needed
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Featured Products</h2>
                <Button onClick={handleSeeMoreClick}>See More</Button>
            </div>
            <ImageSlider products={featuredProducts} />
        </div>
    );
};

export default FeaturedProducts;
