/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar = ({ avatarSrc, notificationCount }) => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === '1') {
      navigate('/profile'); // Điều hướng sang trang Profile
    } else if (e.key === '2') {
      // Logic for settings
    } else if (e.key === '3') {
      // Logic for logging out
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        View Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />} danger>
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
            src={avatarSrc}
            size="large"
            style={{ cursor: 'pointer' }}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
