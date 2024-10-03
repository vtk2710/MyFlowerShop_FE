import { useState } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../Share/Product";
import Header from "../components/Header/header";
import "./viewpage.scss";
import RelatedProductsSwiper from "./RelatedProductsSwiper/RelatedProductsSwiper";


const ProductPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const product = Products.find((p) => p.Id === parseInt(id)); // Tìm sản phẩm theo ID
  const [quantity, setQuantity] = useState(1); // Sử dụng state để quản lý quantity

  // Hàm để tăng số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Hàm để giảm số lượng (giảm xuống không dưới 1)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="product-container">
        {/* Hình ảnh sản phẩm */}
        <div className="product-image">
          <img
            src={product.Image}
            alt={product.Name}
            className="product-img"
          />
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="product-details">
          <h1 className="product-title">{product.Name} - {product.Price}</h1>
          <p className="product-description">{product.Description}</p>
          <p><strong>Origin:</strong> {product.Origin}</p>
          <p><strong>Shop:</strong> {product.ShopName}</p>

          {/* Chọn số lượng */}
          <div className="quantity-section">
            {/* <h2 className="section-title">Quantity</h2> */}
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-btn" onClick={increaseQuantity}>+</button>
            </div>
          </div>

          {/* Tùy chọn giá */}
          <div className="price-options-section">
            <h2 className="section-title">Price options</h2>
            <div className="price-options">
              <label className="price-option">
                <input type="radio" name="priceOption" />
                <span>One time purchase. {product.Price}</span>
              </label>
              <label className="price-option">
                <input type="radio" name="priceOption" />
                <span>Subscribe now, and save 25% on this order.</span>
              </label>
            </div>
          </div>

          {/* Nút Thêm vào giỏ hàng */}
          <button className="add-to-basket-btn">ADD TO CART</button>
          
        </div>
      </div>
      <RelatedProductsSwiper shopName={product.ShopName} currentProductId={product.Id} />
    </div>
  );
};

export default ProductPage;
