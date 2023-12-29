// FeaturedProducts.tsx
import { Product} from '../../types/types';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Box } from '@mui/material';
import './FeaturedProducts.css'
import ImageSlider from '../ImageSlider';
import ImageSliderSkeleton from '../ImageSliderSkeleton';
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
        <Box sx={{ mt: 4, mb: 4 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          endIcon={<KeyboardDoubleArrowRightIcon />} 
          onClick={handleSeeMoreClick}
          sx={{ textTransform: 'none' }}
        >
          See All
        </Button>
      </Box>

      {loading ? (
        <ImageSliderSkeleton />
      ) : (
        <ImageSlider products={featuredProducts} />
      )}
    </Box>
    );
};

export default FeaturedProducts;
