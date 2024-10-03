/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react'; // Nhập các thành phần cần thiết từ Swiper
import 'swiper/swiper-bundle.css'; // Nhập CSS cho Swiper
import { Products } from "../../Share/Product"; 
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import './relatedproductsswiper.scss'; // Nhập CSS cho component

const RelatedProductsSwiper = ({ currentProductId, shopName }) => {
  const relatedProducts = Products.filter(
    product => product.ShopName === shopName && product.Id !== currentProductId
  );
  
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Kiểm tra nếu không có sản phẩm liên quan
  if (relatedProducts.length === 0) {
    return <p>No related products from {shopName}.</p>;
  }

  const handleOpen = (product) => {
    navigate(`/ViewPage/${product.Id}`);
  };

  return (
    <div className="related-products">
      <h2>Related Products from {shopName}</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={3} // Hiển thị 3 sản phẩm trên mỗi slide
        loop={false} // Đặt loop là false để không lặp lại
        pagination={{ clickable: true }} // Kích hoạt phân trang
        className='mySwiperRelatedProducts'
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.Id}>
            <div className="product-flower">
              <img src={product.Image} alt={product.Name} />
              <h3>{product.Name}</h3>
              <p>{product.Price}</p>
              <Button
                type="primary"
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
