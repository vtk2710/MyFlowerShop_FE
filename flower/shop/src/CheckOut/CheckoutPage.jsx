/* eslint-disable no-unused-vars */

/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from "react";
import { Button, Input, Form, message, Select, Radio, Space } from "antd";
import "./CheckoutPage.scss";
import Header from "../components/Header/header";
import Footer from "../Home/footer/footer";
import { Link } from "react-router-dom";
import { createAddress, getAddresses } from "../API/address";
import { createOrder } from "../API/order/order";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [existedAddresses, setExistedAddresses] = useState([]);
  const [addressId, setAddressId] = useState("");
  console.log({
    existedAddresses
  })

  useEffect(() => {
    getAddresses().then((data) => {
      setExistedAddresses(data?.$values || []);
      setAddressId(data?.$values?.[0]?.addressId)
    });
  }, []);



  // Danh sách voucher
  const validVouchers = {
    SALE10: {
      discount: 10,
      createdDate: "2024-09-01",
      expiryDate: "2024-12-31",
      remaining: 100,
    },

    //ok tiếp đi ông
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
          console.log(cartItems)
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
   // 
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
    return parseFloat(priceString);
  };

  // Hàm tính tổng cho từng sản phẩm
  const calculateItemTotal = (item) => {
    const price = extractPrice(item.price);
    const quantity = parseInt(item.quantity);
    return price * quantity;
  };

  // Hàm tính tổng tiền của toàn bộ giỏ hàng hoặc sản phẩm "Buy Now"
  const calculateTotal = () => {
    // Tính tổng giá trị của các sản phẩm trong giỏ hàng
    const total = cartItems.reduce((acc, flower) => acc + calculateItemTotal(flower), 0);

    // Định dạng tổng giá trị theo định dạng tiền tệ Việt Nam
    return total;
  };

  // Hàm tính tổng tiền sau khi áp dụng giảm giá
  const calculateTotalAfterDiscount = () => {
    const total = calculateTotal();
    const discountAmount = (total * discount) / 100;
    return (total - discountAmount).toLocaleString("vi-VN");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  console.log(userInfo)
  //customer info
  const [customerInfo, setCustomerInfo] = useState({
    name: userInfo.fullName,
    phone: "0123456789",
    address: "",
  });

  // Recipient info
  // const [isRecipientMyself, setIsRecipientMyself] = useState(true);
  // const [recipientInfo, setRecipientInfo] = useState({
  //   name: "",
  //   phone: "",
  //   address: "",
  // });
  // Hàm xử lý thay đổi giá trị trong input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };
  //Hàm xử lý thay đổi giá trị

  // const handleRecipientChange = (e) => {
  //   setIsRecipientMyself(e.target.value === "myself");
  // };

  //radio button style
  // const [selectedButton, setSelectedButton] = useState("myself");
  // const radioGroupStyle = {
  //   display: "flex",
  //   justifyContent: "center",
  //   marginBottom: "20px",
  //   gap: "30px",
  //   alignItems: "center",
  // };

  const handleCheckout = async () => {
    try {
      let finalAddressId = "";
      let finalPhone = customerInfo.phone;
      if (!addressId || addressId === "other") {
        // Create new address with value entered from input
        const newAddress = await createAddress(
          customerInfo?.address || ""
        );

        if (!newAddress?.addressId) {
          message.error("Failed to create address");
          return;
        }
        finalAddressId = newAddress?.addressId;
      } else {
        // Use the one that selected
        finalAddressId = addressId;
      }

      const order = {
        "phoneNumber": finalPhone,
        "addressId": finalAddressId,
        "voucherIds": [

        ]
      }

      const newOrder = await createOrder(order);
      if (newOrder?.paymentUrl) {
        window.location.href = newOrder?.paymentUrl;
      }
    } catch (error) {
      message.error("Unexpected error occurred");
    }
  }

  const shouldShowAddressInput = !existedAddresses?.length || addressId === "other"

  return (
    <>
      <Header />
      <div className="checkout-container">
        <h2>Checkout</h2>

        {/* Thông tin khách hàng */}
        <div
          className="customer-info-container"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <h3>Customer Information</h3>
          <div>
            <div style={{ display: "block" }}>
              {/* <h4>Form for Myself</h4> */}
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
                  {!!existedAddresses?.length &&
                    <Radio.Group
                      value={addressId}
                      onChange={(e) => {
                        setAddressId(e.target.value)
                      }}
                    >
                      <Space direction="vertical">
                        {existedAddresses.map(address => {
                          return <Radio value={
                            address?.addressId
                          }>
                            {address?.description}</Radio>
                        })}
                        <Radio value={"other"}>Other</Radio>
                      </Space>
                    </Radio.Group>
                  }
                  {shouldShowAddressInput && <Input
                    style={{
                      marginTop: 10
                    }}
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                  />}
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
                key={item.flowerId}
                className="cart-item"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.flowerName}
                  style={{ width: "100px", marginRight: "10px" }}
                />
                <div>
                  <p>
                    <strong>{item.flowerName} </strong>
                  </p>
                  <p>
                    {item.quantity} x{" "}
                    {extractPrice(item.price).toLocaleString("vi-VN")} VND
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
              onClick={handleCheckout}
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
