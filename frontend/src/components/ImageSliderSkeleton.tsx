import React from 'react';
import Slider from 'react-slick';
import { Card, CardContent, Typography, Button, Skeleton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSliderSkeleton: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const renderProductCardSkeleton = () => (
        <Card className="product-card">
            <Skeleton variant="rectangular" height={400} style={{ width: '100%' }} /> {/* Adjust height as per your design */}
            <CardContent className="card-content">
                <Typography variant="h6">
                    <Skeleton width="80%" />
                </Typography>
                <Typography variant="body2">
                    <Skeleton width="60%" />
                </Typography>
            </CardContent>
            <div className="add-to-cart-button">
                <Button variant="contained" size="small" startIcon={<ShoppingCartIcon />} disabled>
                    <Skeleton width="100%" />
                </Button>
            </div>
        </Card>
    );

    return (
        <Slider {...settings}>
            {[...Array(3)].map((_, index) => (
                <div key={index} style={{ padding: '0 10px' }}>
                    {renderProductCardSkeleton()}
                </div>
            ))}
        </Slider>
    );
};

export default ImageSliderSkeleton;
