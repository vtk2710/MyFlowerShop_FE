import { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, Space } from "antd";
import "./UserManage.scss";
import { Link } from "react-router-dom";
const { Search } = Input;

// Dữ liệu ban đầu của bảng
const initialUserData = [
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
    avatar: "https://i.pravatar.cc/150?img=1",
    created_date: "2020-01-01",
    updated_date: "2022-01-01",
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
    avatar: "https://i.pravatar.cc/150?img=2",
    created_date: "2019-03-11",
    updated_date: "2021-04-20",
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
    avatar: "https://i.pravatar.cc/150?img=3",
    created_date: "2021-07-14",
    updated_date: "2023-02-05",
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
    avatar: "https://i.pravatar.cc/150?img=4",
    created_date: "2018-12-25",
    updated_date: "2020-10-14",
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
    avatar: "https://i.pravatar.cc/150?img=5",
    created_date: "2020-05-20",
    updated_date: "2022-08-30",
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
    avatar:
      "https://congdongdanhgia.com/wp-content/uploads/2022/03/anime-chibi-21.jpg",
    created_date: "2017-01-10",
    updated_date: "2021-12-25",
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
    avatar: "https://i.pravatar.cc/150?img=7",
    created_date: "2019-11-22",
    updated_date: "2022-05-18",
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
    avatar: "https://i.pravatar.cc/150?img=8",
    created_date: "2022-09-15",
    updated_date: "2023-04-10",
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
      setData(initialUserData);
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
    localStorage.setItem("userData", JSON.stringify(newData));
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
    localStorage.setItem("userData", JSON.stringify(newData));
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
