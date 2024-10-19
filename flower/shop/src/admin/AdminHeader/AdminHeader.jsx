/* eslint-disable no-unused-vars */
import { Layout, Avatar, Badge, Menu, Dropdown } from "antd";
import { MailOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "./AdminHeader.scss";
const { Header } = Layout;

// Tạo menu dropdown
const menu = (
  <Menu>
    <Menu.Item key="3" icon={<LogoutOutlined />} danger>
      Log Out
    </Menu.Item>
  </Menu>
);

const AdminHeader = () => {
  return (
    <Header
      style={{
        background: "#fff",
        padding: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",

        boxShadow: "0 2px 8px #f0f1f2",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Biểu tượng thông báo */}
        {/* <Badge count={3} style={{ marginRight: 20 }}>
          <MailOutlined style={{ fontSize: "24px" }} />
        </Badge> */}

        {/* Dropdown avatar */}
        <Dropdown overlay={menu} trigger={["click"]}>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Avatar người dùng */}
            <Avatar
              src="https://i.redd.it/ucl3qmsvu9l41.jpg"
              size="large"
              icon={<UserOutlined />}
              style={{ objectFit: "fill" }}
            />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AdminHeader;
