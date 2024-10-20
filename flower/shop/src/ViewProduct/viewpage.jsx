/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../Share/Product";
import Header from "../components/Header/header";
import "./viewpage.scss";
import RelatedProductsSwiper from "./RelatedProductsSwiper/RelatedProductsSwiper";
import { notification, Button, Modal, Input, Select } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";

const { TextArea } = Input;
const { Option } = Select;

const ProductPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const product = Products.find((p) => p.Id === parseInt(id)); // Tìm sản phẩm theo ID
  const [quantity, setQuantity] = useState(1); // Sử dụng state để quản lý số lượng
  const [cart, setCart] = useState([]); // Quản lý giỏ hàng
  const [isModalVisible, setIsModalVisible] = useState(false); // State quản lý modal
  const [reportText, setReportText] = useState(""); // State cho nội dung báo cáo
  const [issueType, setIssueType] = useState(""); // State để quản lý loại báo cáo

  useEffect(() => {
    setQuantity(1);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi vào trang chi tiết
  }, [id]);

  // nhập số lượng
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value); // Chỉ cho phép số lượng từ 1 trở lên
    }
  };

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

  // Hàm mua sản phẩm thành công
  const handleBuyNow = () => {
    const productToBuy = {
      ...product,
      quantity: Number(quantity),
    };

    localStorage.setItem("buyNowProduct", JSON.stringify(productToBuy));
    window.location.href = "/checkout";
  };

  // Thông báo thêm vào giỏ hàng thành công
  const openNotificationAddToCart = () => {
    notification.open({
      message: "Notification Cart",
      description:
        "Add to cart successfully! Please check your cart to see the product.",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      duration: 1,
    });
  };

  // Xử lý khi nhấn nút thêm vào giỏ hàng
  const handleButtonClick = () => {
    openNotificationAddToCart();
    handleAddToCart();
  };

  // Mở modal gửi báo cáo
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Đóng modal gửi báo cáo
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Xử lý khi gửi báo cáo
  const handleReportSubmit = () => {
    if (reportText.trim() === "") {
      notification.error({
        message: "Error",
        description: "Report content cannot be empty.",
      });
      return;
    }

    // Tạo nội dung báo cáo bao gồm : thông tin sản phẩm và nội dung báo cáo
    const reportContent = {
      key: Date.now().toString(), // Tạo ID duy nhất cho báo cáo
      productId: product.Id, // ID của sản phẩm
      productName: product.Name, // Tên sản phẩm
      shopName: product.ShopName, // Tên cửa hàng
      issueType: issueType, // Loại báo cáo
      description: reportText, // Nội dung báo cáo từ người dùng
      status: "Not processed", // Trạng thái của báo cáo
      createDate: new Date().toISOString().split("T")[0], // Ngày tạo báo cáo
    };

    // Lấy báo cáo hiện tại từ localStorage (nếu có)
    const existingReports =
      JSON.parse(localStorage.getItem("reportsOfData")) || [];

    // Thêm báo cáo mới vào danh sách
    const updatedReports = [...existingReports, reportContent];

    // Lưu lại danh sách báo cáo mới vào localStorage
    localStorage.setItem("reportsOfData", JSON.stringify(updatedReports));

    notification.success({
      message: "Report Sent",
      description: "Your report has been sent to admin successfully!",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });

    setReportText(""); // Reset nội dung báo cáo
    setIsModalVisible(false);
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
            <strong>Category:</strong> {product.Category}
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
              min="1" // Đảm bảo giá trị không nhỏ hơn 1
              className="quantity-input"
            />
            <button className="quantity-btn" onClick={increaseQuantity}>
              +
            </button>
          </div>

          {/* Nút Thêm vào giỏ hàng */}
          <button className="add-to-basket-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          {/* Nút Mua ngay */}
          <Button
            type="primary"
            style={{ marginLeft: "10px", width: "300px", height: "50px" }}
            className="add-to-cart-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
          <div style={{ marginTop: "100px" }}>
            <Button type="primary" onClick={showModal} className="report-btn">
              Report to Admin
            </Button>
          </div>
        </div>
      </div>
      <RelatedProductsSwiper
        shopName={product.ShopName}
        currentProductId={product.Id}
      />
      <Footer />

      {/* Modal báo cáo */}
      <Modal
        title="Report to Admin"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleReportSubmit}>
            Submit
          </Button>,
        ]}
      >
        <label
          style={{ marginBottom: "8px", display: "block", fontWeight: "bold" }}
        >
          Choose the issue:
        </label>
        <Select
          placeholder="Select an issue type"
          style={{ width: "100%", marginBottom: "20px" }}
          value={issueType.value || issueType}
          onChange={(value) => setIssueType(value)}
          title="Issue Type"
        >
          <Option value="Poor Quality">Poor Quality</Option>
          <Option value="Wrong Item">Wrong Item</Option>
          <Option value="Other">Other</Option>
        </Select>

        {/* TextArea để nhập nội dung báo cáo */}
        <TextArea
          rows={4}
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Please describe the issue or problem with this product..."
        />
      </Modal>
    </div>
  );
};

export default ProductPage;
