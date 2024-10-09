import React from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { UserOutlined, DashboardOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Giữ lại cho các phần khác nếu cần

const { Header } = Layout;

const Navbar = ({ sellerName }) => {
  const navigate = useNavigate();  // Dùng cho phần điều hướng đến trang seller

  const handleMenuClick = (e) => {
    if (e.key === '1') {
      window.location.href = 'http://localhost:5173/homepage';  // Chuyển hướng đến trang homepage
    } else if (e.key === '3') {
      navigate('/seller');  // Điều hướng tới trang seller
    }
  };

  const handleSellerClick = () => {
    navigate('/seller');  // Chuyển hướng tới trang seller khi bấm vào tên người dùng
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="3" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Seller Management Page</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={handleSellerClick} icon={<UserOutlined />} type="text">
          {sellerName}
        </Button>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button icon={<DashboardOutlined />} type="text">
            Menu
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
