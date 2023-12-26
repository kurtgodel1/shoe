import Slider from 'react-slick';
import { Category } from '../types/types';
import TiltCard from './TiltCard';


interface CategorySliderProps {
    categories: Category[];
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: categories.length > 3 ? 3 : categories.length,
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