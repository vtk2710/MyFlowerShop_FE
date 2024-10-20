/* eslint-disable react/prop-types */
import { Avatar, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  DollarOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import './Slidebar.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = ({ setActiveSection, avatarSrc }) => {
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
          defaultSelectedKeys={['flowers']}
          style={{ borderRight: 0 }}
        >
          <Menu.Item key="flowers" icon={<DashboardOutlined />} onClick={() => setActiveSection('flowers')}>
            Flower Post & List
          </Menu.Item>
          <Menu.Item key="orders" icon={<ShoppingCartOutlined />} onClick={() => setActiveSection('orders')}>
            Manage Orders
          </Menu.Item>
          {/* <Menu.Item key="prices" icon={<DollarOutlined />} onClick={() => setActiveSection('prices')}>
            Manage Prices
          </Menu.Item> */}
          <Menu.Item key="customerSupport" icon={<MessageOutlined />} onClick={() => setActiveSection('customerSupport')}>
            Customer Questions
          </Menu.Item>
          <Menu.Item key="feedback" icon={<AppstoreOutlined />} onClick={() => setActiveSection('feedback')}>
            Manage Feedback
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
