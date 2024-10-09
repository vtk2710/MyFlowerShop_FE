/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Input, Form, Radio } from "antd";
import "./CheckoutPage.scss";

const CheckoutPage = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("checkoutItems")) || []
  );
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Customer Info:", customerInfo);
    console.log("Cart:", cart);
    console.log("Payment Method:", paymentMethod);
  };

  // Hàm chuyển đổi chuỗi giá trị thành số
  const extractPrice = (priceString) => {
    // Loại bỏ dấu phẩy và chữ ' VND', rồi chuyển thành số
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  };

  // Hàm tính tổng cho từng sản phẩm trong giỏ hàng
  const calculateItemTotal = (item) => {
    const price = extractPrice(item.Price);
    const quantity = parseInt(item.quantity);
    // Tính tổng tiền của 1 sản phẩm
    return price * quantity;
  };

  // Hàm tính tổng tiền của toàn bộ giỏ hàng
  const calculateTotal = () => {
    // Tính tổng giá trị của các sản phẩm trong giỏ hàng
    const total = cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);

    // Định dạng tổng giá trị theo định dạng tiền tệ Việt Nam
    return total.toLocaleString("vi-VN");
  };
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>Checkout</h2>

        {/* Thông tin giỏ hàng */}
        <div className="cart-summary" style={{ marginBottom: "20px" }}>
          <h3>Cart Summary</h3>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.Id}
                className="cart-item"
                style={{ display: "flex", marginBottom: "10px" }}
              >
                <img src={item.Image} alt={item.Name} />
                <div>
                  <p>
                    <strong>{item.Name}</strong>
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

        {/* Tính tổng tiền của giỏ hàng */}
        <div
          className="total-summary"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <h2 style={{ color: "red" }}>TOTAL: {calculateTotal()} VND</h2>
        </div>

        {/* Thông tin khách hàng */}
        <div
          className="customer-info"
          style={{ marginBottom: "20px", overflow: "hidden" }}
        >
          <h3>Customer Information</h3>
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

        {/* Phương thức thanh toán */}
        <div className="payment-method" style={{ marginBottom: "20px" }}>
          <h3>Payment Method</h3>
          <Radio.Group
            onChange={handlePaymentChange}
            value={paymentMethod}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Radio value="cash">Cash on Delivery</Radio>
            <Radio value="creditCard">Credit Card</Radio>
            <Radio value="paypal">PayPal</Radio>
          </Radio.Group>
        </div>

        {/* Nút Xác nhận thanh toán */}
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        >
          Confirm Checkout
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
