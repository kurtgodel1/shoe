// ProductCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Product } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Ensure this is imported
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Skeleton from '@mui/material/Skeleton';


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevents the click event from reaching the card
        dispatch(addToCart(product));
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    interface Image {
        image: string;
      }

    const getRandomImages = (images: Image[], count: number) => {
        const indices = new Set<number>();
        while(indices.size < count) {
            indices.add(Math.floor(Math.random() * images.length));
        }
        return Array.from(indices).map(index => images[index]);
    };

    return (
        <Card className="product-card">
            <Slider {...settings} >
            {getRandomImages(product.images, 1).map((image, index) => (
                    <div key={index} onClick={(e) => e.stopPropagation()}>
                               {image ? (
                        <img src={image.image} alt={product.name} style={{ width: '100%' }} onClick={handleCardClick}/>
                    ) : (
                        <Skeleton variant="rectangular" width={210} height={118} />
                    )}
                    </div>
                ))}
            </Slider>
            <CardContent className="card-content">
                <Typography gutterBottom variant="h6" component="h2" className="product-name">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="product-description">
                    ${product.price}
                </Typography>
            </CardContent>
            <div className="add-to-cart-button">
                <Button variant="contained" size="small" onClick={handleAddToCart} startIcon={<ShoppingCartIcon />}>Add to Cart</Button>
            </div>
        </Card>
    );
};

export default ProductCard;
