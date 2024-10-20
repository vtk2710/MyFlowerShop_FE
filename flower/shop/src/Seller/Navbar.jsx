/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {React, useEffect, useState} from 'react';
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Header } = Layout;

const Navbar = ({ avatarSrc, notificationCount }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();

  const handleMenuClick = (e) => {
    if (e.key === '1') {
      navigate('/profile'); // Điều hướng sang trang Profile
    } else if (e.key === '2') {
      // Logic for settings
    } else if (e.key === '3') {
      // Logic for logging out
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/');
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
    console.log(userInfo);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        View Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />} danger onClick={handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff', padding: '0 20px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Seller Management Page</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Notification Icon */}
        <Badge count={notificationCount} offset={[10, 0]}>
          <MailOutlined style={{ fontSize: '24px', marginRight: '20px', cursor: 'pointer' }} />
        </Badge>
        {/* Avatar */}
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Avatar
            src={userInfo?.avatar}
            size="large"
            style={{ cursor: 'pointer' }}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
