import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Grid} from '@mui/material';
import { Product } from '../types/types';
import config from '../config';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCube } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import { Swiper as SwiperClass } from 'swiper';
import './ProductDetailPage.css'
import ProductTabs from './ProductTabs';


const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const [cubeSwiper, setCubeSwiper] = useState<SwiperClass | null>(null); // Correctly typed

  useEffect(() => {
    axios.get<Product>(`${config.API_URL}/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => console.error('Error fetching product details', error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; // Or some loading component
  }

  const handleAddToCart = () => {
    console.log('Adding to cart');
    dispatch(addToCart(product));
  };

  const updateCubeSwiper = (index: number) => {
    if (cubeSwiper) {
      cubeSwiper.slideToLoop(index);
    }
  };

  return (
    <div className="mb-60">
        <Box className="productDetailContainer" sx={{ padding: 2 }}>
        <Grid container spacing={2}>
        <Grid item xs={12} md={2} sx={{ display: 'flex' }}>
            <Swiper
            direction={'vertical'}
                loop={true}
              slidesPerView={4}
              spaceBetween={200}
              navigation
              modules={[Navigation]}
              className="mySwiper navSwiper navSwiperVertical mt-2"
              style={{ height: '70vh' }} // Adjust height as needed
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.image}
                    alt={product.name}
                    style={{ width: '100%', cursor: 'pointer' }}
                    onClick={() => updateCubeSwiper(index)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Swiper
              style={{ height: '70vh' }} // Add this line
              effect={'cube'}
              loop={true}
              grabCursor={true}
              cubeEffect={{
                "shadow": true,
                "slideShadows": true,
                "shadowOffset": 100,
                "shadowScale": 0.94
              }}
              modules={[EffectCube, Pagination]}
              className="mySwiper"
              onSwiper={(swiper) => setCubeSwiper(swiper)}
              >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image.image} alt={product.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Price: ${product.price}
            </Typography>
            <Button variant="contained" size="small" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <ProductTabs product={product}/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductDetailPage;
