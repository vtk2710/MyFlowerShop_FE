/* eslint-disable no-unused-vars */
import { SmileOutlined } from "@ant-design/icons";
import { Button, Input, Modal, notification, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../API/cart/cart";
import Header from "../../components/Header/header";
import RelatedProductsSwiper from "../../ViewProduct/RelatedProductsSwiper/RelatedProductsSwiper";
import "./viewflower.scss"; // CSS phù hợp

const { TextArea } = Input;
const { Option } = Select;

const FlowerPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [trigger, setTrigger] = useState(0);
  console.log("ID from URL:", id);
  const [quantity, setQuantity] = useState(1); // Sử dụng state để quản lý số lượng
  const [cart, setCart] = useState([]); // Quản lý giỏ hàng
  const [flower, setFlowerDetails] = useState({}); // Giống biến "flower"
  const [reportText, setReportText] = useState(""); // State cho nội dung báo cáo
  const [issueType, setIssueType] = useState(""); // State để quản lý loại báo cáo
  const [isModalVisible, setIsModalVisible] = useState(false); // State quản lý modal

  const getFlowerDetails = async () => {
    if (!flower.categoryId) {
      console.error("categoryId is missing or undefined.");
      return;
    }

    try {
      const response = await axios.get(
        `https://localhost:7198/api/Category/${flower.categoryId}/flowers`
      );
      console.log("Flowers details fetched by categoryId:", response.data);
      setFlowerDetails(response.data);
    } catch (error) {
      console.error("Error fetching flower details by categoryId:", error);
    }
  };

  useEffect(() => {
    const fetchFlowerDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7198/api/FlowerInfo/${id}`
        );
        setFlowerDetails(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching flower details:", error);
      }
    };

    fetchFlowerDetails();
  }, [id, trigger]);

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

  //Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!flower.flowerId) {
      notification.error({
        message: "Error",
        description: "Flower ID is missing. Please try again later.",
      });
      console.error("flowerId is undefined. Cannot add to cart.");
      return;
    }
    //const productToAdd = { ...flower, quantity: Number(quantity) }; // Thêm thông tin sản phẩm và đảm bảo quantity là số
    try {
      await addToCart(flower.flowerId, quantity);
      setTrigger((p) => p + 1);
      notification.success({
        message: `Add ${flower.flowerName} quantity ${quantity} successfully !`,
      });
    } catch (error) {
      notification.error({
        message: "Thêm quá số lượng available !",
      });
      console.error("Error adding to cart:", error);
    }
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
  const handleReportSubmit = async () => {
    // Kiểm tra nếu `flowerId` hoặc `sellerId` bị thiếu
    if (!flower.flowerId || !flower?.sellerId) {
      notification.error({
        message: "Error",
        description: "Missing required fields. Please try again.",
      });
      return;
    }

    if (!issueType) {
      notification.error({
        message: "Error",
        description: "Please select an issue type before submitting.",
      });
      return;
    }

    const reportContent = {
      FlowerId: flower.flowerId,
      SellerId: flower.sellerId,
      ReportReason: issueType,
      ReportDescription: reportText,
    };

    console.log("Report Content:", reportContent);
    console.log("Report Reason:", issueType);
    console.log("Report Content being sent:", {
      FlowerId: flower.flowerId,
      SellerId: flower.sellerId,
      ReportReason: issueType,
      ReportDescription: reportText,
    });

    try {
      const userLogin = localStorage.getItem("token");
      const response = await axios.post(
        "https://localhost:7198/api/Report/CreateReport",
        reportContent,
        {
          headers: {
            Authorization: `Bearer ${userLogin}`,
          },
        }
      );

      if (response.status === 201) {
        notification.success({
          message: "Report Sent",
          description: "Your report has been sent successfully.",
        });
        setReportText("");
        setIsModalVisible(false);
      } else {
        throw new Error("Failed to send report.");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to send report. Please try again.",
      });
      console.error("Error sending report:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="product-container">
        {/* Hình ảnh sản phẩm */}
        <div className="product-image">
          <img
            src={flower.imageUrl}
            alt={flower.flowerName}
            className="product-img"
          />
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="product-details">
          <h1 className="product-title">
            {flower.flowerName} - {flower.price}
          </h1>
          <p className="product-description">{flower.flowerDescription}</p>
          <p>Available quantity: {flower.availableQuantity}</p>
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
          <button className="add-to-basket-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <div style={{ marginTop: "100px" }}>
            <Button type="primary" onClick={showModal}>
              Report to Admin
            </Button>
          </div>
        </div>
      </div>
      <RelatedProductsSwiper
        currentFlowerId={flower.flowerId}
        currentCategoryId={flower.categoryId}
      />

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
          value={issueType}
          onChange={(value) => setIssueType(value)}
        >
          <Option value="Poor Quality">Poor Quality</Option>
          <Option value="Wrong Item">Wrong Item</Option>
          <Option value="Other">Other</Option>
        </Select>

        {/* TextArea để nhập nội dung báo cáo */}

        {issueType === "Other" && (
          <TextArea
            rows={4}
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder="Please describe the issue or problem with this product..."
          />
        )}
      </Modal>
    </div>
  );
};

export default FlowerPage;
