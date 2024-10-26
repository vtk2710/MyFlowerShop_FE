/* eslint-disable react/prop-types */
import { Avatar, Menu, Button, Collapse } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import './Slidebar.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActiveSection }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
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
      console.log(response.data)
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="sidebar">
      <div className="top-section">
        <div className="avatar-container">
          <Avatar
            src={userInfo?.avatar}
            size={70}
            icon={<UserOutlined />}
            style={{ objectFit: 'cover' }}
          />
          <h2>Welcome, {userInfo?.fullName}</h2>
        </div>
      </div>
      <div className="bottom-section">
        <Menu
          mode="inline"
          defaultSelectedKeys={['profile']}
          style={{ borderRight: 0 }}
        >
          <Menu.SubMenu key="account" title="Account">
            <Menu.Item key="profile" onClick={() => setActiveSection('profile')}>
              Your Account Profile
            </Menu.Item>
            <Menu.Item key="orderHistory" onClick={() => setActiveSection('orderHistory')}>
              Order History
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="shop" title="Shop">
            {userInfo?.role === "Seller" ?
              <>
                <Menu.Item key="flowers" icon={<DashboardOutlined />} onClick={() => setActiveSection('flowers')}>
                  Flower Post & List
                </Menu.Item>
                <Menu.Item key="orders" icon={<ShoppingCartOutlined />} onClick={() => setActiveSection('orders')}>
                  Manage Orders
                </Menu.Item>
                <Menu.Item key="feedback" icon={<AppstoreOutlined />} onClick={() => setActiveSection('feedback')}>
                  Manage Feedback
                </Menu.Item>
              </> : null}
            {userInfo?.role === "User" && (
              <Menu.Item
                style={{
                  margin: 0,
                  padding: 0,
                  height: "auto",
                  width: "100%"
                }}
              >
                <div style={{
                  display: 'flex', flex: 1,
                  padding: "16px 0"

                  , flexDirection: 'column', alignItems: 'center'
                }}>
                  <div style={{
                    userSelect: "none"
                  }}>
                    This feature is just for sellers.
                  </div>
                  <Button
                    type="primary"
                    style={{
                      flex: 1,
                      width: "fit-content"
                    }}
                    onClick={() => navigate("/seller-register")}
                  >
                    Register as Seller
                  </Button>
                </div>
              </Menu.Item>
            )}
          </Menu.SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
