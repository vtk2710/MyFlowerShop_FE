// src/Sidebar.jsx

import { Layout, Menu } from "antd";
import { UserOutlined, LaptopOutlined, BankOutlined } from "@ant-design/icons";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  return (
    <Sider width={250} style={{ height: "100vh", background: "#fff" }}>
      <div className="welcome-section">
        <img
          src="https://i.redd.it/ucl3qmsvu9l41.jpg"
          alt="User"
          className="welcome-avatar"
        />
        <p className="welcome-text">Welcome, Admin </p>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {/* Dashboard Menu */}
        <SubMenu key="sub1" icon={<UserOutlined />} title="Dashboard">
          {/* Liên kết đến Dashboard 1 */}
          <Menu.Item key="1">
            <Link to="/admin/dashboard1">Dashboard 1</Link>
          </Menu.Item>
          {/* Liên kết đến Dashboard 2 */}
          <Menu.Item key="2">
            <Link to="/admin/dashboard2">Dashboard 2</Link>
          </Menu.Item>
          {/* Liên kết đến Dashboard 3 */}
          {/* <Menu.Item key="3">
            <Link to="/admin/dashboard3">Dashboard 3</Link>
          </Menu.Item> */}
        </SubMenu>

        {/* UI Elements Menu */}
        <SubMenu
          key="sub2"
          icon={<LaptopOutlined />}
          title="Manage Account User"
        >
          {" "}
          <Menu.Item key="4">
            <Link to="/admin/manageuser">Manage Account User</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/admin/ReportAdmin">View Report User</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/admin/SellersManage">Manage Sellers</Link>
          </Menu.Item>
        </SubMenu>

        {/* Settings Menu */}
        <SubMenu key="sub3" icon={<BankOutlined />} title="Manage Category">
          {" "}
          <Menu.Item key="3">
            <Link to="/admin/CategoryManage">Manage Category</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
