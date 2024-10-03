//HEADER version 2
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { MenuOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
// import api from "../../config/axios";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Quản lý trạng thái hiển thị modal
  const [isSignUp, setIsSignUp] = useState(false);  // Quản lý trạng thái đăng nhập/đăng ký
  const [loading, setLoading] = useState(false); // Quản lý trạng thái load
  const [userInfo, setUserInfo] = useState(null);


  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token is undefined. User might not be logged in.");
      return;
    }
    try {
      const response = await axios.get("https://localhost:7198/api/UserInfo/info", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogin = async (values) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', values.username);
      formData.append('password', values.password);

      const response = await axios.post("https://localhost:7198/login", formData);
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
      formSignUpData.append('username', values.username);
      formSignUpData.append('password', values.password)
      formSignUpData.append('email', values.email);
      
      const response = await fetch("https://localhost:7198/register", {
        method: 'POST',
        body: formSignUpData
      });

      if(response.ok) {
        const data = await response.json();
        console.log("Sign up success:", data);
        setIsVisible(false); // Close modal
        navigate("/create-profile"); // Chuyển về trang create profile nếu thành công
      }

    } catch(error) {
      console.error("Sign up failed: ", error.response ? error.response.data : error);
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
              <Link to="/hoa-hong">ROSES</Link>
            </li>
            <li>
              <Link to="/hoa-cuoi">WEDDING FLOWERS</Link>
            </li>
            <li>
              <Link to="/hoa-chuc-mung">CONGRATULATORY FLOWERS</Link>
            </li>
            <li>
              <Link to="/hoa-chia-buon">SYMPATHY FLOWERS</Link>
            </li>
            <li>
              <Link to="/hoa-sinh-nhat">BIRTHDAY FLOWERS</Link>
            </li>
            <li>
              <Link to="/hoa-dip-le">HOLIDAY FLOWERS</Link>
            </li>
            <li>
              <Link to="/hoa-lan">ORCHIDS</Link>
            </li>
            <li>
              <Link to="/hoa-de-ban">TABLE FLOWERS</Link>
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
                <Dropdown overlay={menu} trigger={['click']}>
                  <img
                    src={userInfo.avatar || "/default-avatar.png"}
                    alt="Avatar"
                    className="user-avatar"
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
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

      {/* Modal for Sign In/Sign Up */}
      <Modal
        title={isSignUp ? "Sign Up" : "Sign In"}
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        width={400}
        className="modal-wrapper"
        footer={null}
      >
        <div className="form-container">
          <Form
            name={isSignUp ? "signup_form" : "signin_form"}
            onFinish={handleSubmit}
            layout="vertical"
          >
            {!isSignUp && (
              <>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: "Please input your username!" }]}
                >
                  <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    Sign In
                  </Button>
                </Form.Item>
              </>
            )}


            {/* Modal Sign Up */}
            {isSignUp && (
              <>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: "Please input your username!" }]}
                >
                  <Input placeholder="Enter your username" />
                </Form.Item>

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
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
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
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    Sign Up
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>

          <Button type="link" onClick={toggleForm}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Header;


