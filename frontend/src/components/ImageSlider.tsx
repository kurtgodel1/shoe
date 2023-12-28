import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { Product } from '../types/types';
import React, { useState, useEffect } from 'react';


interface ImageSliderProps {
    products: Product[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ products }) => {
    const slideCount = products.length > 3 ? 3 : products.length;

    const [slidesToShow, setSlidesToShow] = useState(window.innerWidth <= 768 ? 1 : slideCount);

    useEffect(() => {
        const handleResize = () => {
            setSlidesToShow(window.innerWidth <= 768 ? 1 : 3);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {products.map(product => (
                <div key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </Slider>
    );
};

export default ImageSlider;