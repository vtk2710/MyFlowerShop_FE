/* eslint-disable react/no-unescaped-entities */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Comment.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Comment() {
  return (
    <>
      <div className="sw">
        <h2>Feedback and Review</h2>
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swip">
          <div className="comment">
            <div className="comment__content">
              <h3>Cristiano Ronaldo</h3>
              <p>
                "Buying flowers is not only about giving gifts, it's about
                expressing emotions and appreciation. A beautiful bouquet can
                bring unexpected joy to the recipient."
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swip">
          <div className="comment">
            <div className="comment__content">
              <h3>Lionel Messi</h3>
              <p>
                "Flowers bring peace to the soul. They're like football—when you
                take care of them and spend time, you'll see the sweet results."
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swip">
          <div className="comment">
            <div className="comment__content">
              <h3>Nguyen Cong Phuong</h3>
              <p>
                "Coach: Cong Phuong is always artistic, he always buys flowers
                from clearance shops. This not only shows his refined aesthetic
                taste but also that he knows how to appreciate the value of
                things that seem to have passed. He often picks the best flowers
                and turns them into meaningful gifts for his friends and loved
                ones. This thoughtfulness not only freshens up his living space
                but also spreads joy to those around him."
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swip">
          <div className="comment">
            <div className="comment__content">
              <h3>Ed Sheeran</h3>
              <p>
                "Flowers are a great source of inspiration for my music. They
                evoke emotions and colors, just like the melodies in a song."
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swip">
          <div className="comment">
            <div className="comment__content">
              <h3>Ariana Grande</h3>
              <p>
                "Flowers are a wonderful gift from nature. They make life more
                beautiful and remind me of the importance of self-care."
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
