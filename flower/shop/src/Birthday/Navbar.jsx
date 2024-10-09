/* eslint-disable no-unused-vars */
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { MenuOutlined, SearchOutlined, UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation(); // Lấy URL hiện tại
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false); // State quản lý hiển thị modal giỏ hàng
  const [cart, setCart] = useState([]); // State cho giỏ hàng

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onSearch = (value) => {
    console.log(value);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
    setIsVisible(false);
  };

  useEffect(() => {
    console.log("Giỏ hàng hiện tại:", cart);
  }, [cart]);

  const handleCartOpen = () => {
    setIsCartVisible(true);
  };

  const handleCartClose = () => {
    setIsCartVisible(false);
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src="/image/logo2.png" width={80} alt="Logo" />
        </div>

        <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            {/* Để HOME có thể click và chuyển hướng về /homepage */}
            <li><Link to="/homepage">HOME</Link></li>
            {/* ROSES sẽ được highlight nếu đang ở trang /rose */}
            <li><span className="disabled-link">ROSES</span></li>
            <li><span className="disabled-link">WEDDING FLOWERS</span></li>
            <li><span className="disabled-link">CONGRATULATORY FLOWERS</span></li>
            <li><span className={location.pathname === "/birthday" ? "active-link" : "disabled-link"}>BIRTHDAY FLOWERS</span></li>
            <li><span className="disabled-link">HOLIDAY FLOWERS</span></li>
            <li><span className="disabled-link">ORCHIDS</span></li>
            <li><span className="disabled-link">TABLE FLOWERS</span></li>
            <li>
              <UserOutlined
                onClick={() => setIsVisible(true)}
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </li>
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
        width={400}
      >
        <div>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index}>
                <p>{item.Name} - {item.Price}</p>
              </div>
            ))
          ) : (
            <p>Giỏ hàng trống</p>
          )}
        </div>
      </Modal>

      {/* Modal đăng nhập/đăng ký */}
      <Modal
        title={isSignUp ? "Sign Up" : "Sign In"}
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        width={400}
        className="modal-wrapper"
        bodyStyle={{ padding: "24px", minHeight: "300px" }}
        footer={null}
      >
        <div className="form-container">
          {/* Form Sign In */}
          <Form
            name="signin_form"
            onFinish={handleSubmit}
            layout="vertical"
            className={`form-transition ${isSignUp ? "form-hidden" : "form-visible"}`}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <div style={{ textAlign: "right", marginBottom: "16px" }}>
              <Button
                type="link"
                className="forgot-password-link"
                onClick={() => alert("Đang cập nhật quên mật khẩu")}
              >
                Forget Password?
              </Button>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Form Sign Up */}
          <Form
            name="signup_form"
            onFinish={handleSubmit}
            layout="vertical"
            className={`form-transition ${isSignUp ? "form-visible" : "form-hidden"}`}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <div>
            <Button type="link" className="signup-link" onClick={toggleForm}>
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Header;
