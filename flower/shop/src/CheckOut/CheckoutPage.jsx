/* eslint-disable no-unused-vars */

/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from "react";
import { Button, Input, Form, message, Select, Radio } from "antd";
import "./CheckoutPage.scss";
import Header from "../components/Header/header";
import Footer from "../Home/footer/footer";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  // Danh sách voucher
  const validVouchers = {
    SALE10: {
      discount: 10,
      createdDate: "2024-09-01",
      expiryDate: "2024-12-31",
      remaining: 100,
    },
    SALE20: {
      discount: 20,
      createdDate: "2024-09-15",
      expiryDate: "2024-12-31",
      remaining: 50,
    },
    SALE30: {
      discount: 30,
      createdDate: "2024-10-01",
      expiryDate: "2024-12-31",
      remaining: 20,
    },
  };

  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    // Kiểm tra xem có cờ "checkoutFromCart" trong localStorage không???
    const checkoutFlag = localStorage.getItem("checkoutFromCart");

    if (checkoutFlag === "true") {
      // Lấy giỏ hàng từ localStorage, kiểm tra giá trị trước khi parse
      const storedCart = localStorage.getItem("checkoutItems");
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (error) {
          console.error("Error parsing checkoutItems: ", error);
        }
      }
    } else {
      // Nếu không có cờ, lấy sản phẩm "Buy Now" từ localStorage, kiểm tra giá trị trước khi parse
      const productData = localStorage.getItem("buyNowProduct");
      if (productData) {
        try {
          setCartItems([JSON.parse(productData)]);
        } catch (error) {
          console.error("Error parsing buyNowProduct: ", error);
        }
      }
    }

    // Xóa cờ "checkoutFromCart" sau khi kiểm tra xong
    localStorage.removeItem("checkoutFromCart");
  }, []);

  const handleSelectVoucher = (value) => {
    if (value === "none") {
      setSelectedVoucher(null);
      setDiscount(0);
      message.info("No voucher applied.");
    } else {
      setSelectedVoucher(value);
    }
  };
  // Hàm áp dụng voucher
  const applyVoucher = (selectedVoucher) => {
    if (!selectedVoucher) {
      message.info("No voucher applied.");
      setDiscount(0);
      return;
    }

    const selectedVoucherData = validVouchers[selectedVoucher];
    // Kiểm tra ngày hết hạn của voucher
    if (selectedVoucherData) {
      const today = new Date();
      const expiryDate = new Date(selectedVoucherData.expiryDate);

      if (today > expiryDate) {
        message.error("Voucher has expired.");
        setDiscount(0);
        return;
      }
      // Kiểm tra số lượng voucher còn lại
      if (selectedVoucherData.remaining <= 0) {
        message.error("This voucher is no longer available.");
        setDiscount(0);
        return;
      }

      // Giảm giá
      setDiscount(selectedVoucherData.discount);
      message.success(
        `Voucher applied! ${selectedVoucherData.discount}% discount.`
      );
    } else {
      setDiscount(0);
      message.error("Invalid voucher. Please try again.");
    }
  };

  // Hàm chuyển đổi chuỗi giá trị thành số
  const extractPrice = (priceString) => {
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  };

  // Hàm tính tổng cho từng sản phẩm
  const calculateItemTotal = (item) => {
    const price = extractPrice(item.Price);
    const quantity = parseInt(item.quantity);
    return price * quantity;
  };

  // Hàm tính tổng tiền của toàn bộ giỏ hàng hoặc sản phẩm "Buy Now"
  const calculateTotal = () => {
    // Tính tổng giá trị của các sản phẩm trong giỏ hàng
    const total = cart.reduce((acc, flower) => acc + calculateItemTotal(flower), 0);

    // Định dạng tổng giá trị theo định dạng tiền tệ Việt Nam
    return total.toLocaleString("vi-VN");
  };

  // Hàm tính tổng tiền sau khi áp dụng giảm giá
  const calculateTotalAfterDiscount = () => {
    const total = calculateTotal();
    const discountAmount = (total * discount) / 100;
    return (total - discountAmount).toLocaleString("vi-VN");
  };

  //customer info
  const [customerInfo, setCustomerInfo] = useState({
    name: "Vu Min Duc",
    phone: "0123456789",
    address: "123 Main Street",
  });
  // Recipient info
  const [isRecipientMyself, setIsRecipientMyself] = useState(true);
  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  // Hàm xử lý thay đổi giá trị trong input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isRecipientMyself) {
      setCustomerInfo({ ...customerInfo, [name]: value });
    } else {
      setRecipientInfo({ ...recipientInfo, [name]: value });
    }
  };
  //Hàm xử lý thay đổi giá trị

  const handleRecipientChange = (e) => {
    setIsRecipientMyself(e.target.value === "myself");
  };

  //radio button style
  const [selectedButton, setSelectedButton] = useState("myself");
  const radioGroupStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "30px",
    alignItems: "center",
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        <h2>Checkout</h2>

        {/* Thông tin giỏ hàng */}
        <div className="cart-summary" style={{ marginBottom: "20px" }}>
          <h3>Cart Summary</h3>
          {cart.length > 0 ? (
            cart.map((flower) => (
              <div
                key={flower.flowerID}
                className="cart-item"
                style={{ display: "flex", marginBottom: "10px" }}
              >
                <img src={flower.imageUrl} alt={flower.flowerName} />
                <div>
                  <p>
                    <strong>{flower.flowerName}</strong>
                  </p>
                  <p>
                    {flower.quantity} x{" "}
                    {extractPrice(flower.price).toLocaleString("vi-VN")} VND
                  </p>
                  <h5 style={{ color: "red" }}>
                    {calculateItemTotal(flower).toLocaleString("vi-VN")} VND
                  </h5>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Tính tổng tiền của giỏ hàng */}
        <div
          className="total-summary"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <h2 style={{ color: "red" }}>TOTAL: {calculateTotal()} VND</h2>
        </div>

        {/* Thông tin khách hàng */}
        <div
          className="customer-info-container"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <h3>Customer Information</h3>
          <div style={{ marginBottom: "20px" }}>
            <Radio.Group
              onChange={handleRecipientChange}
              value={isRecipientMyself ? "myself" : "other"}
              style={radioGroupStyle}
            >
              <Radio.Button value="myself" className="radio-button">
                I am the recipient
              </Radio.Button>
              <Radio.Button value="other" className="radio-button">
                Someone else is the recipient
              </Radio.Button>
            </Radio.Group>
          </div>

          {/** Phần này để đảm bảo form hiện đúng theo điều kiện */}
          <div>
            <div style={{ display: isRecipientMyself ? "block" : "none" }}>
              <h4>Form for Myself</h4>
              <Form layout="vertical">
                <Form.Item label="Name">
                  <Input
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Phone">
                  <Input
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Address">
                  <Input
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Form>
            </div>

            <div style={{ display: !isRecipientMyself ? "block" : "none" }}>
              <h4>Form for Someone Else</h4>
              <Form layout="vertical">
                <Form.Item label="Name">
                  <Input
                    name="name"
                    value={recipientInfo.name}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Phone">
                  <Input
                    name="phone"
                    value={recipientInfo.phone}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Address">
                  <Input
                    name="address"
                    value={recipientInfo.address}
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>

        {/* Hiển thị các sản phẩm trong giỏ hàng hoặc sản phẩm "Buy Now" */}
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.Id}
                className="cart-item"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={item.Image}
                  alt={item.Name}
                  style={{ width: "100px", marginRight: "10px" }}
                />
                <div>
                  <p>
                    <strong>{item.Name} </strong>
                  </p>
                  <p>
                    {item.quantity} x{" "}
                    {extractPrice(item.Price).toLocaleString("vi-VN")} VND
                  </p>
                  <h5 style={{ color: "red" }}>
                    {calculateItemTotal(item).toLocaleString("vi-VN")} VND
                  </h5>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div
          className="total-summary"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <h1 style={{ color: "red" }}>
            Total: {calculateTotal().toLocaleString("vi-VN")} VND
          </h1>

          {/* Chỉ hiển thị giảm giá nếu có mã được áp dụng */}
          {discount > 0 ? (
            <>
              <h3>Sale: {discount}%</h3>
              <h3>
                {" "}
                -{((calculateTotal() * discount) / 100).toLocaleString(
                  "vi-VN"
                )}{" "}
                VND
              </h3>
              <h1 style={{ color: "red" }}>
                Total After Discount:{" "}
                {calculateTotalAfterDiscount().toLocaleString("vi-VN")} VND
              </h1>
            </>
          ) : (
            <h3>No discount applied</h3>
          )}
        </div>

        {/* Voucher */}

        <div
          className="checkout-end"
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "20px",
          }}
        >
          <div
            className="voucher"
            style={{
              marginBottom: "20px",
              flex: "1",
              borderRight: "1px solid #ccc",
              paddingRight: "20px",
            }}
          >
            <h3>Apply Voucher</h3>

            {/* Chọn Voucher */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Select
                style={{ width: "400px" }}
                dropdownStyle={{
                  width: "auto",
                  maxWidth: "500px",
                  whiteSpace: "normal",
                }}
                placeholder="Select a voucher"
                onChange={handleSelectVoucher}
                value={selectedVoucher ? selectedVoucher : undefined}
                optionLabelProp="label"
              >
                {Object.keys(validVouchers).map((voucher) => (
                  <Select.Option
                    key={voucher}
                    value={voucher}
                    label={`${voucher} - ${validVouchers[voucher].discount}% off`}
                  >
                    {voucher} - {validVouchers[voucher].discount}% off
                    <br />
                    Created Date: {validVouchers[voucher].createdDate}, Expiry
                    Date: {validVouchers[voucher].expiryDate}
                    <br />
                    Remaining: {validVouchers[voucher].remaining} vouchers
                  </Select.Option>
                ))}
              </Select>

              {/* Hiển thị thông tin voucher */}
              {selectedVoucher && (
                <div>
                  <p>
                    You selected: {selectedVoucher} -{" "}
                    {validVouchers[selectedVoucher].discount}% off
                  </p>
                </div>
              )}

              {/* Nút hủy voucher */}
              {selectedVoucher && (
                <button
                  style={{
                    width: "150px",
                    padding: "8px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedVoucher(null);
                    setDiscount(0);
                    message.info("Voucher cleared.");
                  }}
                >
                  Clear Voucher
                </button>
              )}
              {/* Apply voucher  */}
              <button
                style={{
                  width: "250px",
                  padding: "10px",
                  backgroundColor: "#1890ff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => applyVoucher(selectedVoucher)}
              >
                Apply Voucher
              </button>
            </div>
          </div>

          {/* Payment  */}
          <div
            className="payment-method"
            style={{ marginBottom: "20px", flex: "1" }}
          >
            <h3>Payment Method</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link to="#" className="payment-link">
                <img
                  src="./picture/vnp.png"
                  alt="VNPay"
                  style={{ objectFit: "cover", width: "100px" }}
                />
              </Link>
            </div>

            <Button
              type="primary"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Confirm Checkout
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
