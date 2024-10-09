/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../Share/Product";
import Header from "../components/Header/header";
import "./viewpage.scss";
import RelatedProductsSwiper from "./RelatedProductsSwiper/RelatedProductsSwiper";
import { notification, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const ProductPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const product = Products.find((p) => p.Id === parseInt(id)); // Tìm sản phẩm theo ID
  const [quantity, setQuantity] = useState(1); // Sử dụng state để quản lý số lượng
  const [cart, setCart] = useState([]); // Quản lý giỏ hàng

  useEffect(() => {
    setQuantity(1);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi vào trang chi tiết
  }, [id]);

  // Hàm để tăng số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Hàm để giảm số lượng (không cho phép giảm xuống dưới 1)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    const productToAdd = { ...product, quantity: Number(quantity) }; // Thêm thông tin sản phẩm và đảm bảo quantity là số
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const productExists = existingCart.find(
      (item) => item.Id === productToAdd.Id
    );
    if (productExists) {
      // Nếu đã có, cập nhật số lượng
      productExists.quantity += quantity;
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
      existingCart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart)); // Lưu giỏ hàng vào localStorage
    setCart(existingCart); // Cập nhật state giỏ hàng để hiển thị
  };

  const openNotification = () => {
    notification.open({
      message: "Notification Cart",
      description:
        "Add to cart successfully! Please check your cart to see the product.",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      duration: 1.5,
    });
  };

  const handleButtonClick = () => {
    openNotification();
    handleAddToCart();
  };

  return (
    <div>
      <Header />
      <div className="product-container">
        {/* Hình ảnh sản phẩm */}
        <div className="product-image">
          <img src={product.Image} alt={product.Name} className="product-img" />
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="product-details">
          <h1 className="product-title">
            {product.Name} - {product.Price}
          </h1>
          <p className="product-description">{product.Description}</p>
          <p>
            <strong>Origin:</strong> {product.Origin}
          </p>
          <p>
            <strong>Shop:</strong> {product.ShopName}
          </p>
          {/* Chọn số lượng */}
          <div className="quantity-section">
            <button className="quantity-btn" onClick={decreaseQuantity}>
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="quantity-input"
            />
            <button className="quantity-btn" onClick={increaseQuantity}>
              +
            </button>
          </div>
          {/* Nút Thêm vào giỏ hàng */}
          <Button
            type="primary"
            onClick={handleButtonClick}
            className="add-to-cart-btn"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <RelatedProductsSwiper
        shopName={product.ShopName}
        currentProductId={product.Id}
      />
    </div>
  );
};

export default ProductPage;
