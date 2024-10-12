import { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, Space } from "antd";
import "./UserManage.scss";
import { Link } from "react-router-dom";
const { Search } = Input;

// Dữ liệu ban đầu của bảng
const initialData = [
  {
    key: "1",
    userName: "user1",
    password: "pass1",
    status: "Active",
    user_id: 1,
    address: "123 Main Street, City A",
    full_name: "John Doe",
    birth_date: "1990-01-01",
    sex: "Male",
    points: 80,
  },
  {
    key: "2",
    userName: "user2",
    password: "pass2",
    status: "Active",
    user_id: 2,
    address: "456 Central Avenue, City B",
    full_name: "Jane Smith",
    birth_date: "1985-05-15",
    sex: "Female",
    points: 95,
  },
  {
    key: "3",
    userName: "ducky",
    password: "quackquack123",
    status: "Active",
    user_id: 3,
    address: "789 Lake Road, City C",
    full_name: "Daisy Duck",
    birth_date: "1992-03-22",
    sex: "Female",
    points: 70,
  },
  {
    key: "4",
    userName: "johndoe",
    password: "johndoepass",
    status: "Active",
    user_id: 4,
    address: "101 Hilltop Blvd, City D",
    full_name: "Johnny Doe",
    birth_date: "1980-12-30",
    sex: "Male",
    points: 60,
  },
  {
    key: "5",
    userName: "janedoe",
    password: "janedoepass",
    status: "Active",
    user_id: 5,
    address: "202 Valley Road, City E",
    full_name: "Janet Doe",
    birth_date: "1995-07-11",
    sex: "Female",
    points: 85,
  },
  {
    key: "6",
    userName: "admin",
    password: "admin12345",
    status: "Active",
    user_id: 6,
    address: "303 Ocean Drive, City F",
    full_name: "Admin User",
    birth_date: "1983-11-05",
    sex: "Male",
    points: 100,
  },
  {
    key: "7",
    userName: "superuser",
    password: "superuserpass",
    status: "Active",
    user_id: 7,
    address: "404 Mountain Road, City G",
    full_name: "Super User",
    birth_date: "1999-09-09",
    sex: "Male",
    points: 75,
  },
  {
    key: "8",
    userName: "guest",
    password: "guest123",
    status: "Active",
    user_id: 8,
    address: "505 Pine Street, City H",
    full_name: "Guest User",
    birth_date: "2000-02-28",
    sex: "Female",
    points: 50,
  },
];

const UserManage = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(""); // State cho ô tìm kiếm

  // Lấy dữ liệu từ localStorage hoặc dùng initialData nếu không có
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData && savedData.length > 0) {
      setData(savedData);
    } else {
      setData(initialData);
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data));
  }, [data]);

  // Xóa tạm thời người dùng
  const deleteRecord = (key) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, status: "Banned" }; // Chuyển trạng thái thành Banned
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
      align: "center",
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
            <Button
              type="link"
              style={{ color: "red" }}
              onClick={() => undoBan(record.key)}
            >
              Unban
            </Button>
          )}
          <Link to={`/userdetail/${record.key}`} style={{ marginLeft: 8 }}>
            View Details
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div className="user-manage-container">
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by username"
          allowClear
          value={searchText} // Thêm value để liên kết với state
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>

      <Table
        dataSource={filteredData}
        columns={columns}
        rowClassName="editable-row"
        pagination={{ pageSize: 7 }} // Số dòng tối đa trên mỗi trang
      />
    </div>
  );
};

export default UserManage;
