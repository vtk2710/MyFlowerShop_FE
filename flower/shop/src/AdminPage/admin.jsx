import { Layout } from "antd";
import { Outlet } from "react-router-dom"; // Sử dụng Outlet để hiển thị nội dung động
import SideBar from "../Sidebar/Sidebar"; // Import SideBar
import AdminHeader from "../admin/AdminHeader/AdminHeader";
// Import AdminHeader

const { Content } = Layout;

const Admin = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar điều hướng */}
      <SideBar /> {/* Hiển thị sidebar */}
      {/* Layout chính cho nội dung */}
      <Layout className="site-layout" style={{ padding: "0 24px 24px" }}>
        <AdminHeader /> {/* Hiển thị header */}
        {/* Nội dung sẽ thay đổi dựa trên định tuyến con */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          <Outlet />{" "}
          {/* Hiển thị các component dựa trên route con như Dashboard1, UserManage */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
