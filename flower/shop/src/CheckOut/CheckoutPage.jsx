/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from "react";
import { Button, Input, Form, message } from "antd";
import "./CheckoutPage.scss";
import Header from "../components/Header/header";
import Footer from "../Home/footer/footer";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  // const [paymentMethod, setPaymentMethod] = useState("cash");
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  // Danh sách các voucher hợp lệ và phần trăm giảm giá tương ứng
  const validVouchers = {
    SALE10: 10, // Giảm 10%
    SALE20: 20, // Giảm 20%
    SALE30: 30, // Giảm 30%
  };

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
      // Nếu không có cờ, lấy sản phẩm "Buy Now" từ localStorage
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

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  // const handlePaymentChange = (e) => {
  //   setPaymentMethod(e.target.value);
  // };

  const handleVoucherChange = (e) => {
    setVoucher(e.target.value);
  };

  // Hàm áp dụng voucher
  const applyVoucher = () => {
    const upperCaseVoucher = voucher.trim().toUpperCase(); // Chuyển mã voucher thành chữ in hoa

    if (validVouchers.hasOwnProperty(upperCaseVoucher)) {
      const discountValue = validVouchers[upperCaseVoucher];
      setDiscount(discountValue);
      message.success(`Voucher applied! ${discountValue}% discount.`);
    } else {
      setDiscount(0);
      message.error("Invalid voucher. Please try again.");
    }
  };

  const handleSubmit = () => {
    console.log("Customer Info:", customerInfo);
    console.log("Cart:", cartItems);
    // console.log("Payment Method:", paymentMethod);
    console.log("Voucher:", voucher);
    console.log("Discount Applied:", discount);
    console.log("Total After Discount:", calculateTotalAfterDiscount());
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
    return cartItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  };

  // Hàm tính tổng tiền sau khi áp dụng giảm giá
  const calculateTotalAfterDiscount = () => {
    const total = calculateTotal();
    const discountAmount = (total * discount) / 100;
    return (total - discountAmount).toLocaleString("vi-VN");
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        <h2>Checkout</h2>

        {/* Thông tin khách hàng */}
        <div className="customer-info" style={{ marginBottom: "20px" }}>
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

        {/* Hiển thị các sản phẩm trong giỏ hàng hoặc sản phẩm "Buy Now" */}
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.Id}
                className="cart-item"
                style={{ display: "flex", marginBottom: "10px" }}
              >
                <img
                  src={item.Image}
                  alt={item.Name}
                  style={{ width: "100px", marginRight: "10px" }}
                />
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

        <div
          className="total-summary"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          {/* <h2 style={{ color: "red" }}>TOTAL: {calculateTotal().toLocaleString("vi-VN")} VND</h2> */}
          <h2 style={{ color: "red" }}>
            TOTAL : {calculateTotalAfterDiscount()} VND
          </h2>
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
            <div style={{ display: "flex", gap: "10px" }}>
              <Input
                placeholder="Enter voucher code"
                value={voucher}
                onChange={handleVoucherChange}
                style={{ flex: "1" }}
              />
              <Button
                type="primary"
                onClick={applyVoucher}
                style={{ margin: "10px" }}
              >
                Apply
              </Button>
            </div>
            {/* <h2 style={{ color: "red" }}>TOTAL AFTER DISCOUNT: {calculateTotalAfterDiscount()} VND</h2> */}
          </div>

          {/* Phương thức thanh toán */}
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
                  src="./public/picture/vnp.png"
                  alt="VNPay"
                  style={{ objectFit: "cover", width: "100px" }}
                />
              </Link>
            </div>

            <Button
              type="primary"
              onClick={handleSubmit}
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
