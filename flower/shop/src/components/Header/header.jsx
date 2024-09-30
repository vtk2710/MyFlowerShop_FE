//HEADER version 2
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { MenuOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input } from "antd";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../config/firebase";
import api from "../../config/axios";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Quản lý trạng thái hiển thị modal
  const [isSignUp, setIsSignUp] = useState(false);  // Quản lý trạng thái đăng nhập/đăng ký
  const [loading, setLoading] = useState(false); // Quản lý trạng thái load

  // //Google Login handler
  // const handleGoogle = () => {
  //   signInWithPopup(auth, googleAuthProvider)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result); // Thông tin người đăng nhập
  //       console.log("Google login success:", credential);
  //       // Handle successful Google login (navigate to dashboard or handle token)
  //     })
  //     .catch((error) => {
  //       console.error("Google login error:", error);
  //     });
  // };

  //Login API
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const formLoginData = new URLSearchParams();
      //Thêm data vào body form
      formLoginData.append('username', values.username);
      formLoginData.append('password', values.password);

      //Gọi tới API login để xử lý
      const response = await fetch("https://localhost:7198/login", {
        method : 'POST',
        body: formLoginData
      });

      //Trả về kết quả
      if (response.ok) {
        const data = await response.json();

        //Kiểm tra role của user đăng nhập
        if(data.type == 'admin') {
          localStorage.setItem("token", data.token)
          setIsVisible(false);
          navigate("/admin-page") // Chuyển về trang của admin
        } 
        else if(data.type == 'user'){
          localStorage.setItem("token", data.token)
          setIsVisible(false);
          navigate("/user-page"); // Chuyển về trang của user
        } 
        else {
          localStorage.setItem("token", data.token);
          setIsVisible(false);
          navigate("seller-page"); // Chuyển về trang của staff
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error);
    } finally {
      setLoading(false);
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
            <li>
              <UserOutlined
                onClick={() => setIsVisible(true)}
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

                {/* <Form.Item>
                  <button className="login__google" onClick={handleGoogle}>
                    <img
                      src="https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png"
                      alt="Google Login"
                      width={50}
                    />
                    <span>Login With Google</span>
                  </button>
                </Form.Item> */}
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


//HEADER 1
// import { Link, useNavigate } from "react-router-dom";
// import "./header.scss";
// import { MenuOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
// import { Modal, Button, Form, Input } from "antd";
// import { useState } from "react";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, googleAuthProvider } from "../../config/firebase";
// import api from "../../config/axios";
// import axios from "axios";

// function Header() {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [isVisible, setIsVisible] = useState(false); // Quản lý trạng thái hiển thị modal
//   const [isSignUp, setIsSignUp] = useState(false); // Quản lý trạng thái đăng nhập/đăng ký
//   const [loading, setLoading] = useState(false);


//   //Google
//   const handleGoogle = () => {
//     signInWithPopup(auth, googleAuthProvider)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result); // thông tin của người đăng nhập
//         console.log(credential);
//       })
//       .catch((error) => {
//         console(error);
//       });
//   };

//   //Login API
//   const handleLogin = async (values) => {
//     try {
//       setLoading(true);
//       const formData = new URLSearchParams();
//       formData.append('username', values.username);
//       formData.append('password', values.password);

//       const response = await fetch("https://localhost:7198/login", {
//         method: 'POST',
//         body: formData
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Login success:", data);
//         setIsVisible(false); // Close modal
//         navigate("/admin-page"); // Redirect on successful login
//       }
//     } catch (error) {
//       console.error("Login failed:", error.response ? error.response.data : error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const onSearch = (value) => {
//     console.log(value);
//   };

//   // Hàm chuyển đổi giữa Sign In và Sign Up
//   const toggleForm = () => {
//     setIsSignUp(!isSignUp); // Đổi trạng thái giữa Sign In và Sign Up
//   };

//   // Hàm xử lý khi submit form
//   const handleSubmit = (values) => {
//     console.log("Form values: ", values);
//     setIsVisible(false); // Đóng modal sau khi submit
//   };

//   return (
//     <>
//       <header className="header">
//         <div className="header__logo">
//           <img src="/picture/logo2.png" width={80} alt="Logo" />
//         </div>

//         <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
//           <ul className="nav-list">
//             <li>
//               <Link to="/">HOME</Link>
//             </li>
//             <li>
//               <Link to="/hoa-hong">ROSES</Link>
//             </li>
//             <li>
//               <Link to="/hoa-cuoi">WEDDING FLOWERS</Link>
//             </li>
//             <li>
//               <Link to="/hoa-chuc-mung">CONGRATULATORY FLOWERS</Link>
//             </li>
//             <li>
//               <Link to="/hoa-chia-buon">SYMPATHY FLOWERS</Link>
//             </li>
//             <li>
//               <Link to="/hoa-sinh-nhat">BIRTHDAY FLOWERS</Link>
//             </li>
//             <li>
//               <Link to="/hoa-dip-le">HOLIDAY FLOWERS</Link>
//             </li>
//             <li>
//               <Link to="/hoa-lan">ORCHIDS</Link>
//             </li>
//             <li>
//               <Link to="/hoa-de-ban">TABLE FLOWERS</Link>
//             </li>
//             <li>
//               <UserOutlined
//                 onClick={() => setIsVisible(true)}
//                 style={{ fontSize: "20px", cursor: "pointer" }}
//               />
//             </li>
//             <li className="search-icon">
//               <Input
//                 placeholder="Search..."
//                 prefix={<SearchOutlined />}
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 onPressEnter={() => onSearch(searchText)}
//               />
//             </li>
//           </ul>
//         </nav>

//         {/* Nút Toggle Menu */}
//         <div className="menu-toggle" onClick={toggleMenu}>
//           <MenuOutlined />
//         </div>
//       </header>

//       {/* Modal đăng nhập/đăng ký */}
//       <Modal
//         title={isSignUp ? "Sign Up" : "Sign In"}
//         visible={isVisible}
//         onCancel={() => setIsVisible(false)}
//         width={400}
//         className="modal-wrapper"
//         bodyStyle={{ padding: "24px", minHeight: "300px" }}
//         footer={null} // Loại bỏ footer không cần thiết
//       >
//         <div className="form-container">
//           {/* Form Sign In */}
//           <Form
//             onClick={handleLogin}
//             name="signin_form"
//             onFinish={handleSubmit}
//             layout="vertical"
//             className={`form-transition ${isSignUp ? "form-hidden" : "form-visible"
//               }`} // Hiển thị hoặc ẩn form Sign In
//           >
//             <Form.Item
//               name="username"
//               label="Username"
//               rules={[{ required: true, message: "Please input your username!" }]}
//             >
//               <Input type="text" placeholder="Enter your username" />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[
//                 { required: true, message: "Please input your password!" },
//               ]}
//             >
//               <Input.Password placeholder="Enter your password" />
//             </Form.Item>
//             <div style={{ textAlign: "right", marginBottom: "16px" }}>
//               <Button
//                 type="link"
//                 className="forgot-password-link"
//                 onClick={() => alert("Dang Update CÓ VẬY CŨNG QUÊN MK")}
//               >
//                 Forget Password?
//               </Button>
//             </div>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" block>
//                 Sign In
//               </Button>
//             </Form.Item>
//             <Form.Item>
//               <button className="login__google" onClick={handleGoogle}>
//                 <img
//                   src="https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png"
//                   alt=""
//                   width={50}
//                 />
//                 <span>Login With Google</span>
//               </button>
//             </Form.Item>
//           </Form>



//           {/* Form Sign Up */}
//           <Form
//             name="signup_form"
//             onFinish={handleSubmit}
//             layout="vertical"
//             className={`form-transition ${isSignUp ? "form-visible" : "form-hidden"
//               }`} // Hiển thị hoặc ẩn form Sign Up
//           >
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[{ required: true, message: "Please input your email!" }]}
//             >
//               <Input type="email" placeholder="Enter your email" />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[
//                 { required: true, message: "Please input your password!" },
//               ]}
//             >
//               <Input.Password placeholder="Enter your password" />
//             </Form.Item>

//             <Form.Item
//               name="confirm_password"
//               label="Confirm Password"
//               rules={[
//                 { required: true, message: "Please confirm your password!" },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error("The two passwords do not match!")
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password placeholder="Confirm your password" />
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit" block>
//                 Sign Up
//               </Button>
//             </Form.Item>
//           </Form>

//           {/* Đặt nút chuyển đổi bên ngoài form */}
//           <div>
//             <Button type="link" className="signup-link" onClick={toggleForm}>
//               {isSignUp
//                 ? "Already have an account? Sign In"
//                 : "Don't have an account? Sign Up"}
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }

// export default Header;

