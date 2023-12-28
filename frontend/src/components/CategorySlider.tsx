import Slider from 'react-slick';
import { Category } from '../types/types';
import TiltCard from './TiltCard';
import React, { useState, useEffect } from 'react';


interface CategorySliderProps {
    categories: Category[];
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories }) => {
    const slideCount = categories.length > 3 ? 3 : categories.length;

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
            {categories.map(category => (
                <div key={category.id}>
                    <TiltCard category={category} />
                </div>
            ))}
        </Slider>
    );
};

export default CategorySlider;
