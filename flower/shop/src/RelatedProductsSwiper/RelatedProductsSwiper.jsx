/* eslint-disable react/prop-types */

import { Swiper, SwiperSlide } from 'swiper/react'; 
 // Import CSS của Swiper
import { Products } from "../../Share/Product"; 
import {  useNavigate } from 'react-router-dom';
import { Button } from 'antd';


const RelatedProductsSwiper = ({ currentProductId, shopName }) => {
  // Lọc sản phẩm theo tên shop, nhưng bỏ qua sản phẩm hiện tại (tránh lặp lại chính sản phẩm đang xem)
  const relatedProducts = Products.filter(product => product.ShopName === shopName && product.Id !== currentProductId);
 const Navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  // Kiểm tra xem có sản phẩm liên quan không, nếu không có thì không hiển thị Swiper
  //check
  if (relatedProducts.length === 0) {
    return <p>No related products from {shopName}.</p>;
  }
  const handleOpen = (product) => {
    
    Navigate(`/ViewPage/${product.Id}`);
  };
  return (
    <div className="related-products">
      <h2>Related Products from {shopName}</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        navigation
        pagination={{ clickable: true }}
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.Id}>
            <div className="product-card">
              <img src={product.Image} alt={product.Name} />
              <h3>{product.Name}</h3>
              <p>{product.Price}</p>
              <Button
            type="primary" // Sử dụng kiểu "primary"
            onClick={() => handleOpen(product)} // Điều hướng sang trang chi tiết sản phẩm
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
