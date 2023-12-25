import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { Product } from '../types/types';


interface ImageSliderProps {
    products: Product[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ products }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: products.length > 3 ? 3 : products.length,
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