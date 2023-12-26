import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import  { EffectCube, Pagination } from 'swiper/modules';

SwiperCore.use([EffectCube, Pagination]);

const CubeSlider = () => {
  return (
    <Swiper
      effect="cube"
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      pagination={true}
    >
      <SwiperSlide><img src="https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration.png" alt="Slide 1" /></SwiperSlide>
      <SwiperSlide><img src="https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration.png" alt="Slide 2" /></SwiperSlide>
      <SwiperSlide><img src="https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration.png" alt="Slide 3" /></SwiperSlide>
      {/* ... more slides */}
    </Swiper>
  );
};

export default CubeSlider;
