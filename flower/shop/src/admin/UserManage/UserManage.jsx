import { useState } from "react";
import { Table, Button, Input, Popconfirm, Space } from "antd";
import "./UserManage.scss";

const { Search } = Input;

// Dữ liệu ban đầu của bảng
const initialData = [
  { key: "1", userName: "user1", password: "pass1", status: "Active" },
  { key: "2", userName: "user2", password: "pass2", status: "Active" },
  { key: "3", userName: "ducky", password: "quackquack123", status: "Active" },
  { key: "4", userName: "johndoe", password: "johndoepass", status: "Active" },
  { key: "5", userName: "janedoe", password: "janedoepass", status: "Active" },
  { key: "6", userName: "admin", password: "admin12345", status: "Active" },
  {
    key: "7",
    userName: "superuser",
    password: "superuserpass",
    status: "Active",
  },
  { key: "8", userName: "guest", password: "guest123", status: "Active" },
];

const UserManage = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  // Xóa tạm thời người dùng
  const deleteRecord = (key) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, status: "Banned" }; // Chuyển trạng thái thành Banned (đã bị ban)
      }
      return item;
    });
    setData(newData);
  };

  // Hoàn tác xóa (banning) người dùng
  const undoBan = (key) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, status: "Active" }; // Chuyển trạng thái về Active
      }
      return item;
    });
    setData(newData);
  };

  // Lọc dữ liệu theo tìm kiếm
  const filteredData = data.filter((item) =>
    item.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Cột của bảng
  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "Password",
      dataIndex: "password",
      render: () => "••••••",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: (_, record) => (
        <span>
          {record.status === "Active" ? (
            <Popconfirm
              title="Are you sure you want to ban this user?"
              onConfirm={() => deleteRecord(record.key)}
            >
              <Button type="link" danger>
                Ban
              </Button>
            </Popconfirm>
          ) : (
            <Button type="link" onClick={() => undoBan(record.key)}>
              Unban
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="user-manage-container">
      <Space style={{ marginBottom: 16 }}>
        {/* Tìm kiếm người dùng */}
        <Search
          placeholder="Search by username"
          allowClear // Hiển thị nút xóa trên ô tìm kiếm
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>

      <Table
        dataSource={filteredData} // Dữ liệu của bảng sau khi lọc
        columns={columns} // Cột của bảng
        rowClassName="editable-row"
        pagination={
          { pageSize: 5 } // Số dòng tối đa trên mỗi trang
        }
      />
    </div>
  );
};

export default UserManage;
