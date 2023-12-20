// ProductDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, CardMedia } from '@mui/material';
import axios from 'axios';
import { Product } from '../types/types';
import config from '../config';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductTabs from './ProductTabs';


interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const dispatch = useDispatch();


    useEffect(() => {
        axios.get<Product>(`${config.API_URL}/api/products/${productId}`)
        .then(response => {
            setProduct(response.data);
            setSelectedImage(response.data.images[0].image); // Set initial image
        })            .catch(error => console.error('Error fetching product details', error));
    }, [productId]);

    if (!product) {
        return <Typography>Loading...</Typography>; // Or some loading component
    }


    const handleAddToCart = () => {
      console.log('Adding to cart');
      dispatch(addToCart(product));
    };
    
    const ArrowButton = styled(IconButton)(({ theme }) => ({
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        color: theme.palette.common.white,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1, // Add this line
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
    }));
    
    const NextArrow = (props: ArrowProps) => {
        const { onClick } = props;
        return (
            <ArrowButton style={{ right: '10px' }} onClick={onClick}>
                <ArrowForwardIos />
            </ArrowButton>
        );
    };
    
    const PrevArrow = (props: ArrowProps) => {
        const { onClick } = props;
        return (
            <ArrowButton style={{ left: '10px' }} onClick={onClick}>
                <ArrowBackIosNew />
            </ArrowButton>
        );
    };
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: product.images.length < 4 ? product.images.length : 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        image={selectedImage} // Display the selected image
                        alt={product.name}
                    />
                    <Box sx={{ mt:2, position: 'relative', maxWidth: product.images.length < 4 ? `${product.images.length * 10}rem` : '40rem' }}>
                        <Slider {...settings}>
                            {product.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image.image} 
                                        alt={product.name}
                                        style={{ width: '9rem', height: '11rem', marginRight: '2rem', cursor: 'pointer' }}
                                        onClick={() => setSelectedImage(image.image)}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography variant="body1" sx={{ my: 2 }}>
                        {product.description}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Price: ${product.price}
                    </Typography>
                    <Button variant="contained" size="small" onClick={handleAddToCart} startIcon={<ShoppingCartIcon />}>Add to Cart</Button>
                </Grid>
            </Grid>
            <ProductTabs product={product}/>
        </Box>
    );
};

export default ProductDetailPage;
