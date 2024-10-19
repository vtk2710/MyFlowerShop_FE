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

const Sidebar = ({ setActiveSection, avatarSrc }) => {
  return (
    <div className="sidebar">
      <div className="top-section">
        <div className="avatar-container">
          <Avatar
            src={avatarSrc}
            size={70}
            icon={<UserOutlined />}
            style={{ objectFit: 'cover' }}
          />
          <h2>Welcome, Seller</h2>
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
          <Menu.Item key="prices" icon={<DollarOutlined />} onClick={() => setActiveSection('prices')}>
            Manage Prices
          </Menu.Item>
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
