/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import { Swiper, SwiperSlide } from "swiper/react";
import "./carousel.scss";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Flowers } from "../../Share/share";

export default function Carousel({ numberOfSlide = 1, autoplay = false }) {
  return (
    <div className="CarouselPage">
      <Swiper
        slidesPerView={numberOfSlide}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={autoplay ? [Autoplay, Pagination] : []}
        className={`carousel`}
      >
        {Flowers.map((flower) => (
          <SwiperSlide>
            <img src={flower.Image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
