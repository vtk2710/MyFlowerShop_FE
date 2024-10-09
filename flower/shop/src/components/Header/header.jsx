/* eslint-disable no-unused-vars */
//HEADER version 2
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Modal, Button, Form, Input, Dropdown, Menu, Checkbox } from "antd";
import { useEffect, useState } from "react";
// import api from "../../config/axios";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Quản lý trạng thái hiển thị modal
  const [isSignUp, setIsSignUp] = useState(false); // Quản lý trạng thái đăng nhập/đăng ký
  const [loading, setLoading] = useState(false); // Quản lý trạng thái load
  const [userInfo, setUserInfo] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false); // State quản lý hiển thị modal giỏ hàng
  const [cart, setCart] = useState([]); // State cho giỏ hàng
  const [selectedItems, setSelectedItems] = useState([]); // Các sản phẩm được chọn để xóa

  // Hàm lấy giỏ hàng từ localStorage khi trang được tải
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart); // Cập nhật giỏ hàng từ localStorage
  }, []);

  // Hàm xóa sản phẩm
  const handleDeleteItem = (id) => {
    const updatedCart = cart.filter((item) => item.Id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật giỏ hàng trong localStorage
  };

  // Hàm chọn sản phẩm bằng checkbox
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Hàm xóa nhiều sản phẩm
  const handleDeleteSelectedItems = () => {
    const updatedCart = cart.filter((item) => !selectedItems.includes(item.Id));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật giỏ hàng trong localStorage
    setSelectedItems([]); // Xóa danh sách sản phẩm đã chọn
  };

  // Hàm mở modal giỏ hàng
  const handleCartOpen = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart); // Cập nhật giỏ hàng từ localStorage khi mở modal
    setIsCartVisible(true);
  };

  // Hàm đóng modal giỏ hàng
  const handleCartClose = () => {
    setIsCartVisible(false);
  };

  // Hàm lấy giá trị float từ chuỗi giá
  const extractPrice = (priceString) => {
    // Loại bỏ dấu phẩy và chữ ' VND', rồi chuyển thành số
    // return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
    return priceString;
  };

  // Hàm tính tổng giá của các sản phẩm đã được chọn
  const getTotalPrice = () => {
    return (
      cart
        .reduce((total, flower) => {
          if (selectedItems.includes(flower.flowerID)) {
            // Chỉ tính tổng cho các sản phẩm đã chọn
            const price = extractPrice(flower.price) || 0; // Đảm bảo `Price` là số float
            const quantity = parseFloat(flower.quantity) || 1; // Đảm bảo `quantity` là số
            return total + price * quantity; // Cộng tổng giá của sản phẩm đã chọn
          }
          return total;
        }, 0)
        .toLocaleString("vi-VN") + " VND"
    );
  };

  // Hàm lấy thông tin user từ API
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token is undefined. User might not be logged in.");
      return;
    }
    try {
      const response = await axios.get(
        "https://localhost:7198/api/UserInfo/info",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  //Login API
  const handleLogin = async (values) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", values.username);
      formData.append("password", values.password);

      const response = await axios.post(
        "https://localhost:7198/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      // luu tru thong tiun user vao localstorage
      await fetchUserInfo();
      setIsVisible(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //Register API
  const handleSignUp = async (values) => {
    try {
      setLoading(true);
      const formSignUpData = new URLSearchParams();
      //Thêm data vào body form
      formSignUpData.append("username", values.username);
      formSignUpData.append("password", values.password);
      formSignUpData.append("email", values.email);

      const response = await fetch("https://localhost:7198/register", {
        method: "POST",
        body: formSignUpData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sign up success:", data);
        setIsVisible(false); // Close modal
        navigate("/create-profile"); // Chuyển về trang create profile nếu thành công
      }
    } catch (error) {
      console.error(
        "Sign up failed: ",
        error.response ? error.response.data : error
      );
    } finally {
      setLoading(false);
    }
  };




  // Hàm xử lý khi submit form
  const handleSubmit = (values) => {
    if (isSignUp) {
      handleSignUp(values);
    } else {
      handleLogin(values);
    }
  };

  // Chuyển đổi Login/Sign up
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onSearch = (value) => {
    console.log("Search value:", value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    navigate("/"); // Redirect to home page after logout
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src="/picture/logo2.png" width={80} alt="Logo" />
        </div>

        <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/flowers/1">ROSES</Link>
            </li>
            <li>
              <Link to="/flowers/2">WEDDING FLOWERS</Link>
            </li>
            <li>
              <Link to="/flowers/3">CONGRATULATORY FLOWERS</Link>
            </li>
            <li>
              <Link to="/hoa-sinh-nhat">BIRTHDAY FLOWERS</Link>
            </li>
            <li>
              <Link to="/flowers/6">HOLIDAY FLOWERS</Link>
            </li>
            <li>
              <Link to="/flowers/7">ORCHIDS</Link>
            </li>
            <li>
              <Link to="/flowers/8">TABLE FLOWERS</Link>
            </li>

            {/* <li>
              <UserOutlined
                onClick={() => setIsVisible(true)}
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </li> */}

            {/* If logged in, show avatar, else show login icon */}
            {userInfo ? (
              <li>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <img
                    src={userInfo.avatar || "/default-avatar.png"}
                    alt="Avatar"
                    className="user-avatar"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                </Dropdown>
              </li>
            ) : (
              <li>
                <UserOutlined
                  onClick={() => setIsVisible(true)}
                  style={{ fontSize: "20px", cursor: "pointer" }}
                />
              </li>
            )}
            <li className="cart-icon">
              <ShoppingCartOutlined
                onClick={handleCartOpen} // Mở modal giỏ hàng
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </li>

            <li className="search-icon">
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={() => onSearch(searchText)}
              />
            </li>
          </ul>
        </nav>

        <div className="menu-toggle" onClick={toggleMenu}>
          <MenuOutlined />
        </div>
      </header>

      {/* Modal giỏ hàng */}
      <Modal
        title="Cart"
        visible={isCartVisible}
        onCancel={handleCartClose}
        footer={null}
        width={700}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {cart.length > 0 ? (
            <div>
              {/* Nút xóa các sản phẩm đã chọn */}
              <Button
                onClick={handleDeleteSelectedItems}
                disabled={selectedItems.length === 0}
              >
                Delete Selected Items
              </Button>

              {/* Danh sách sản phẩm trong giỏ hàng */}
              {cart.map((flower, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  {/* Checkbox để chọn sản phẩm */}
                  <Checkbox
                    checked={selectedItems.includes(flower.flowerID)}
                    onChange={() => handleSelectItem(flower.flowerID)}
                  />

                  {/* Hiển thị hình ảnh sản phẩm */}
                  <img
                    src={flower.imageUrl}
                    alt={flower.flowerName}
                    width="50px"
                    style={{
                      borderRadius: "100px",
                      width: "100px",
                      height: "100px",
                    }}
                  />

                  {/* Tên sản phẩm và giá */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      {flower.flowerName} - {flower.price}
                    </p>
                  </div>

                  {/* Input số lượng sản phẩm */}
                  <input
                    type="number"
                    value={flower.quantity}
                    min="1"
                    onChange={(e) => {
                      const newQuantity = Number(e.target.value);
                      const updatedCart = [...cart];
                      updatedCart[index].quantity = newQuantity; // Cập nhật số lượng
                      setCart(updatedCart);
                      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật giỏ hàng trong localStorage
                    }}
                    style={{ width: "50px", textAlign: "center" }}
                  />

                  {/* Nút xóa từng sản phẩm */}
                  <Button onClick={() => handleDeleteItem(flower.flowerID)}>
                    Delete
                  </Button>
                </div>
              ))}

              {/* Tính tổng giá trị giỏ hàng cho sản phẩm đã chọn */}
              <p>
                <strong>Total:</strong> {getTotalPrice()}
              </p>

              {/* Nút thanh toán */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Button type="primary" style={{ color: "white" }}>
                  CheckOut
                </Button>
              </div>
            </div>
          ) : (
            <p>Empty Cart Please Buy Something</p>
          )}
        </div>
      </Modal>

      {/* Modal for Sign In/Sign Up */}
      <Modal
        title={isSignUp ? "Sign Up" : "Sign In"}
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        width={400}
        height={500}
        className="modal-wrapper"
        bodyStyle={{ padding: "24px", minHeight: "300px" }}
        footer={null}
      >
        <div className="form-container">
          <Form
            name={isSignUp ? "signup_form" : "signin_form"}
            onFinish={handleSubmit}
            layout="vertical"
            className={`form-transition ${
              isSignUp ? "form-hidden" : "form-visible"
            }`}
          >
            {!isSignUp && (
              <>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <div style={{ textAlign: "right", marginBottom: "16px" }}>
                  <Button
                    type="link"
                    className="forgot-password-link"
                    onClick={() => alert("In development")}
                  >
                    Forgot password?
                  </Button>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    Sign In
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>

          <Form
            name="signup_form"
            onFinish={handleSubmit}
            layout="vertical"
            className={`form-transition ${
              isSignUp ? "form-visible" : "form-hidden"
            }`}
          >
            {isSignUp && (
              <>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input type="email" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>

          <Button
            type="link"
            onClick={toggleForm}
            style={{ margin: "0px 30px" }}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Header;
