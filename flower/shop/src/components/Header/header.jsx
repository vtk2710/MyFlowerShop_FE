/* eslint-disable no-unused-vars */
//HEADER version 2
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.scss";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Modal, Button, Form, Input, Dropdown, Menu, Checkbox } from "antd";
import { useEffect, useState } from "react";
// import api from "../../config/axios";
import axios from "axios";
import { getCart, removeItem } from "../../API/cart/cart";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Quản lý trạng thái hiển thị modal
  const [isSignUp, setIsSignUp] = useState(false); // Quản lý trạng thái đăng nhập/đăng ký
  const [loading, setLoading] = useState(false); // Quản lý trạng thái load
  const [userInfo, setUserInfo] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false); // State quản lý hiển thị modal giỏ hàng
  const [cart, setCart] = useState(null); // State cho giỏ hàng
  const [selectedItems, setSelectedItems] = useState([]); // Các sản phẩm được chọn để xóa
  const [categories, setCategories] = useState([]);
  const [payload, setPayload] = useState({});

  // Lấy danh sách danh mục từ localStorage khi trang được tải (category)
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    if (storedCategories) {
      setCategories(storedCategories);
    }
  }, []);

  //Hàm Search
  const onSearch = () => {
    if (searchText.trim()) {
      // Điều hướng tới trang kết quả tìm kiếm với từ khóa
      navigate(`/search/${searchText}`);
    }
  };

  // Hàm lấy giỏ hàng từ localStorage khi trang được tải
  useEffect(() => {
    if (isVisible) {
      return;
    }
    const savedCart = async () => {
      const data = await getCart();
      console.log(data);
      setCart(data);
    };
    savedCart();
  }, [isVisible, isCartVisible]);

  // Hàm xóa sản phẩm
  const handleDeleteItem = async (id) => {
    const response = await removeItem(id);
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((flower) => flower !== id));
    } else {
      // Nếu sản phẩm chưa được chọn thì thêm vào
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Hàm xử lý chuyển đến trang checkout
  const handleCheckout = () => {
    // Lọc ra các sản phẩm đã được chọn từ giỏ hàng
    const selectedProducts = cart?.items?.$values.filter((flower) =>
      selectedItems.includes(flower.flowerId)
    );

    console.log("Selected Products for Checkout: ", selectedProducts); // Log ra để kiểm tra

    if (selectedProducts.length === 0) {
      alert("Please select items to checkout.");
      return;
    }

    // Lưu các sản phẩm được chọn vào localStorage và điều hướng sang trang checkout
    localStorage.setItem("checkoutItems", JSON.stringify(selectedProducts));
    // Đặt cờ để biết là chuyển từ giỏ hàng
    localStorage.setItem("checkoutFromCart", "true");
    window.location.href = "/checkout";
  };

  // Hàm xóa nhiều sản phẩm
  // const handleDeleteSelectedItems = () => {
  //   const updatedCart = cart?.items?.filter(
  //     (flower) => !selectedItems.includes(flower.flowerID)
  //   );
  //   setCart(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật giỏ hàng trong localStorage
  //   setSelectedItems([]); // Xóa danh sách sản phẩm đã chọn
  // };

  //Hàm chọn tất cả
  // const handleSelectall = () => {
  //   //Nếu độ dài 2 cái = nhau thì xét mảng rỗng
  //   if (selectedItems.length === cart?.items?.$values.length) {
  //     setSelectedItems([]);
  //   } else {
  //     //Thêm vô mảng
  //     const allItems = cart?.items?.$values.map((flower) => flower.flowerI);
  //     setSelectedItems(allItems);
  //   }
  // };

  // Hàm mở modal giỏ hàng
  const handleCartOpen = () => {
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
  // const getTotalPrice = () => {
  //   return (
  //     cart.totalPrice.toLocaleString("vi-VN") + " VND"
  //   );
  // };
  const getTotalPrice = () => {
    return (
      cart?.items?.$values
        .reduce((total, item) => {
          if (selectedItems.includes(item.flowerId)) {
            // Chỉ tính tổng cho các sản phẩm đã chọn
            const price = extractPrice(item.price) || 0; // Đảm bảo `Price` là số float
            const quantity = parseFloat(item.quantity) || 1; // Đảm bảo `quantity` là số
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
      //console.log(response.data.role)
      console.log(response)
      localStorage.setItem("userInfo", JSON.stringify(response.data))
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

      if (response.data.type === "admin") {
        navigate("/admin");
      } else navigate("/");
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
        const userSignUp = await response.json();
        console.log("Sign up success:", userSignUp);
        localStorage.setItem("newUser", JSON.stringify(userSignUp));
        setIsVisible(false); // Close modal

        const loginFormData = formSignUpData;
        loginFormData.delete("email");
        const loginResponse = await axios.post("https://localhost:7198/login",
          loginFormData
        );

        localStorage.setItem("token", loginResponse.data.token);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    navigate("/"); // Redirect to home page after logout
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/user-page">Profile</Link>
      </Menu.Item>
      {userInfo?.role === "Seller" && (
        <Menu.Item key="shop">
          <Link to="/user-page">Shop</Link>
        </Menu.Item>
      )}
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
              <Link to="/flowers/rose">ROSES</Link>
            </li>
            <li>
              <Link to="/flowers/wedding">WEDDING FLOWERS</Link>
            </li>
            <li>
              <Link to="/flowers/congratulatory">CONGRATULATORY FLOWERS</Link>
            </li>
            <li>
              <Link to="/flowers/birthday">BIRTHDAY FLOWERS</Link>
            </li>
            <li>
              <Link to="/flowers/holiday">HOLIDAY FLOWERS</Link>
            </li>
            <li>
              <Link to="/flowers/orchids">ORCHIDS</Link>
            </li>
            <li>
              <Link to="/flowers/table">TABLE FLOWERS</Link>
            </li>
            {/* {categories.map((category) => (
              <li key={category.key}>
                <Link
                  to={`/flowers/${category.Category.toLowerCase().replace(
                    /\s+/g,
                    "-"
                  )}`}
                >
                  {category.Category.toUpperCase()}
                </Link>
              </li>
            ))} */}

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
                onChange={(e) => setSearchText(e.target.value)} // Cập nhật giá trị tìm kiếm
                onPressEnter={onSearch} // Gọi hàm tìm kiếm khi nhấn Enter
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
        title={
          <div style={{ textAlign: "center", width: "100%" }}>
            <ShoppingCartOutlined
              style={{ fontSize: "30px", color: "#ff5a5f" }}
            />
          </div>
        }
        visible={isCartVisible}
        onCancel={handleCartClose}
        footer={null}
        width={850}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {cart?.items?.$values.length > 0 ? (
            <div>
              {/* Nút lấy tất cả sản phẩm */}
              {/* <div className="button-container">
                <Button
                  onClick={handleSelectall}
                  className="button-cart"
                  style={{ width: "100px" }}
                >
                  <CheckCircleOutlined className="icon-cart" />
                </Button> */}

              {/* Nút xóa các sản phẩm đã chọn */}
              {/* <Button
                  className="button-delete"
                  onClick={handleDeleteSelectedItems}
                  disabled={selectedItems.length === 0}
                  style={{ width: "100px" }}
                >
                  <DeleteOutlined className="icon-cart" />
                </Button>
              </div> */}

              {/* Danh sách sản phẩm trong giỏ hàng */}
              {cart?.items?.$values.map((flower, index) => (
                <div
                  key={flower.flowerId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "20px",
                    marginBottom: "10px",
                    marginTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {/* Checkbox để chọn sản phẩm */}
                  <Checkbox
                    checked={selectedItems.includes(flower.flowerId)}
                    onChange={() => handleSelectItem(flower.flowerId)}
                  />

                  {/* Hiển thị hình ảnh sản phẩm */}
                  <img
                    src={flower.imageUrl}
                    alt={flower.flowerName}
                    width="50px"
                    style={{
                      borderRadius: "8px",
                      width: "150px",
                      height: "150px",
                    }}
                  />

                  {/* Tên sản phẩm và giá */}
                  <div
                    style={{
                      display: "flex",
                      gap: "40px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <p style={{ margin: 0, flex: 1 }}>
                      {flower.flowerName} - {flower.shopName}
                    </p>
                    <strong
                      style={{
                        color: "rgb(244 121 122)",
                        flex: 2,
                        textAlign: "center",
                      }}
                    >
                      {flower.price}
                    </strong>
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
                    style={{ width: "10px", textAlign: "center", flex: 0.25 }}
                  />

                  {/* Nút xóa từng sản phẩm */}
                  <Button
                    style={{
                      width: "100px",
                      color: "white",
                      backgroundColor: "#ff5a5f",
                    }}
                    onClick={() => handleDeleteItem(flower.flowerId)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              {/* Tính tổng giá trị giỏ hàng cho sản phẩm đã chọn */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "20px",
                }}
              >
                <p>
                  <strong style={{ fontSize: "25px", color: "red" }}>
                    Total: {getTotalPrice()}
                  </strong>
                </p>
              </div>

              {/* Nút thanh toán */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    color: "white",
                    width: "200px",
                    height: "40px",
                    fontSize: "15px",
                  }}
                  onClick={handleCheckout}
                >
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
