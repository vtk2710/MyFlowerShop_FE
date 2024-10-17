/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react'; // Nhập các thành phần cần thiết từ Swiper
import 'swiper/swiper-bundle.css'; // Nhập CSS cho Swiper
import { Products } from "../../Share/Product"; 
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import './relatedproductsswiper.scss'; // Nhập CSS cho component
import { fetchFlowerList } from '../../API/flower/get_flower_list';
import { useState, useEffect } from 'react';

const RelatedProductsSwiper = ({ currentFlowerId, currentCategoryId }) => {
  const [flowerList, setFlowerList] = useState([]);
  
  useEffect(() => {
    fetchFlowerList(currentCategoryId).then((flowers) => {
      console.log(currentFlowerId, flowers)
      setFlowerList(flowers.filter(f => f.flowerId !== currentFlowerId))
    });
  }, [currentFlowerId, currentCategoryId]);
  
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Kiểm tra nếu không có sản phẩm liên quan
  if (flowerList.length === 0) {
    return <p>No related products</p>;
  }

  const handleOpen = (flower) => {
    navigate(`/viewflower/${flower.flowerId}`);
  };

  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={3} // Hiển thị 3 sản phẩm trên mỗi slide
        loop={false} // Đặt loop là false để không lặp lại
        pagination={{ clickable: true }} // Kích hoạt phân trang
        className="mySwiperRelatedProducts"
      >
        {flowerList.map((flower) => (
          <SwiperSlide key={flower.flowerId}>
            <div className="product-flower">
              <img src={flower.imageUrl} alt={flower.flowerName} />
              <h3>{flower.flowerName}</h3>
              <p>{flower.price}</p>
              <Button
                type="primary"
                onClick={() => handleOpen(flower)} // Điều hướng sang trang chi tiết sản phẩm
                style={{ marginTop: "10px" }}
              >
                View Details
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProductsSwiper;
