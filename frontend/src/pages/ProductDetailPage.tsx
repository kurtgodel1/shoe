import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Grid, Typography, IconButton} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Product } from '../types/types';
import config from '../config';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCube, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import { Swiper as SwiperClass } from 'swiper';
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For Availability
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'; // For Brand
import CategoryIcon from '@mui/icons-material/Category'; // For Category
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import TshirtMockup from '../components/TshirtMockUp';
import CanvasMockup from '../components/CanvasMockup';




const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const [cubeSwiper, setCubeSwiper] = useState<SwiperClass | null>(null); // Correctly typed
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showMockup, setShowMockup] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showImage, setShowImage] = useState(true);


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
    dispatch(addToCart(product));
  };

  const updateCubeSwiper = (index: number) => {
    if (cubeSwiper) {
      cubeSwiper.slideToLoop(index);
    }
  };

  const toggleMockup = () => {
    setShowCanvas(false);
    setShowImage(false);
    setShowMockup(true);
  };

  const toggleCanvas = () => {
    setShowMockup(false);
    setShowImage(false);
    setShowCanvas(true);
  };

  const toggleImage = () => {
    setShowMockup(false);
    setShowCanvas(false);
    setShowImage(true);
  };

  const slides = product.images.map(img => ({ src: img.image, downloadUrl: img.image }));

  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  

    const swiperSlideStyle = {
      height: '70vh', // Set a minimum height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

  return (
    <Box sx={{ flexGrow: 1, width: '100%'  }} className="mb-60">
    <Box className="productDetailContainer" sx={{ padding: 2 }}>
        <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
            <Box position="relative" style={{ height: '100%' }}>
            <Button onClick={toggleImage}>Image</Button>
            <Button onClick={toggleMockup}>T-Shirt</Button>
            <Button onClick={toggleCanvas}>Canvas</Button>
              <Swiper
                effect={'cube'}
                loop={true}
                grabCursor={true}
                cubeEffect={{
                  "shadow": true,
                  "slideShadows": false,
                  "shadowOffset": window.innerWidth <= 768 ? 0:100,
                  "shadowScale": 0.94
                }}
                keyboard={{
                  enabled: true,
                }}
                modules={[EffectCube, Pagination, Navigation, Keyboard]}
                pagination={{ clickable: true }} // Add this line
                className="mySwiper"
                onSwiper={(swiper) => setCubeSwiper(swiper)}
                >
                  {
                  product.images.map((image, index) => (
                    <SwiperSlide key={index} style={swiperSlideStyle}>
                      {showMockup ? (
                          <TshirtMockup image={image.image} />
                        ) : showCanvas ? (
                          <CanvasMockup image={image.image} />
                        ) : showImage ? (
                          <img src={image.image} alt={`Product Image ${index}`} />
                        ): <img src={image.image} alt={`Product Image ${index}`} />
                      }
                    </SwiperSlide>
                  ))}
              </Swiper>
              <IconButton 
                  onClick={() => setLightboxOpen(true)}
                  color="primary" 
                  style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
                >
                  <ZoomInIcon />
              </IconButton>
              {lightboxOpen && (
                  <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={slides.map((slide) => ({
                      ...slide,
                      download: `${slide.src}?download`,
                    }))}
                    plugins={[Fullscreen, Zoom, Thumbnails]}
                    // ... other lightbox props ...
                  />
                )}
            </Box>
            </Grid>
          <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h2" className="pt-3 lg:pt-0">
              {product.name}
            </Typography>
            <Box className="mt-1 mb-10">
              <div className="flex items-center">
                <Rater total={5} interactive={false} rating={3.5} />
                <Typography variant="body2" color="text.secondary" className="ml-3">
                  (150 reviews)
                </Typography>
              </div>
            </Box>
            <Box display="flex" alignItems="center" className="mt-5">
                <CheckCircleOutlineIcon color="success" />
                <Typography variant="body1" className="ml-2">
                  Availability: <span className="text-green-600">In Stock</span>
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" className="mt-5">
                <BrandingWatermarkIcon color="action" />
                <Typography variant="body1" className="ml-2">
                  Brand: <span>{product.brand}</span>
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" className="mt-5">
                <CategoryIcon color="primary" />
                <Typography variant="body1" className="ml-2">
                  Category: <span>{product.category.name}</span>
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" className="mt-5">
                <Typography variant="h4" color="primary" className="mt-4">
                  ${product.price}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" className="mt-5">
                <Typography variant="body2" color="text.secondary" className="mt-4">
                  {product.description}
                </Typography>
              </Box>
              
            <Box className="mt-10">
              <Typography variant="body2" color="text.secondary">Quantity</Typography>
              <div className="flex mt-2">
                <button className={`${plusMinuceButton}`}>−</button>
                <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                  1
                </div>
                <button className={`${plusMinuceButton}`}> +</button>
              </div>
            </Box>
            <Box className="mt-7 flex flex-row items-center gap-6">
              <Button startIcon={<ShoppingCartIcon />} variant="contained" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button startIcon={<FavoriteBorderIcon />} variant="contained">
                Wishlist
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Swiper
              keyboard={{
                enabled: true,
              }}
                loop={true}
                slidesPerView={4}
                spaceBetween={10}
                navigation
                modules={[Navigation, Keyboard]}
                className="mySwiper navSwiper navSwiperVertical mt-2"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.image}
                      alt={product.name}
                      className="w-full cursor-pointer" 
                      onClick={() => updateCubeSwiper(index)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
