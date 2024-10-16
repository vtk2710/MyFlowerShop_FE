import { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";
import "./SellerManage.scss";

const { Search } = Input;

// Dữ liệu ban đầu
const initialData = [
  {
    key: "1",
    userName: "alicesmith",
    password: "alicepass",
    status: "Active",
    user_id: 1,
    address: "12 Sunrise Avenue, City X",
    full_name: "Alice Smith",
    birth_date: "1993-08-12",
    sex: "Female",
    points: 85,
    role: "individual",
    created_date: "2021-01-15",
    updated_date: "2023-05-20",
    shopName: "Floral Delight",
  },
  {
    key: "2",
    userName: "bobenterprise",
    password: "bobenterprise123",
    status: "Active",
    user_id: 2,
    address: "45 Business Street, City Y",
    full_name: "Bob Johnson",
    birth_date: "1975-05-02",
    sex: "Male",
    points: 95,
    role: "enterprise",
    created_date: "2020-06-30",
    updated_date: "2023-04-10",
    shopName: "Elegant Blooms",
  },
  {
    key: "3",
    userName: "charlieind",
    password: "charlie123",
    status: "Active",
    user_id: 3,
    address: "789 Peaceful Road, City Z",
    full_name: "Charlie Brown",
    birth_date: "1990-10-10",
    sex: "Male",
    points: 70,
    role: "individual",
    created_date: "2019-09-12",
    updated_date: "2023-03-22",
    shopName: "Wedding Bliss",
  },
  {
    key: "4",
    userName: "davidoffice",
    password: "davidbusiness456",
    status: "Active",
    user_id: 4,
    address: "101 Industrial Road, City B",
    full_name: "David Thompson",
    birth_date: "1982-11-22",
    sex: "Male",
    points: 60,
    role: "enterprise",
    created_date: "2018-05-18",
    updated_date: "2023-02-15",
    shopName: "Sunshine Petals",
  },
  {
    key: "5",
    userName: "emmaind",
    password: "emmapassword",
    status: "Active",
    user_id: 5,
    address: "234 Forest Lane, City C",
    full_name: "Emma Davis",
    birth_date: "1995-03-15",
    sex: "Female",
    points: 90,
    role: "individual",
    created_date: "2020-12-05",
    updated_date: "2023-01-10",
    shopName: "Nature’s Essence",
  },
  {
    key: "6",
    userName: "frankenterprise",
    password: "frankcompany123",
    status: "Active",
    user_id: 6,
    address: "567 Corporate Park, City D",
    full_name: "Frank Miller",
    birth_date: "1980-12-05",
    sex: "Male",
    points: 100,
    role: "enterprise",
    created_date: "2017-11-22",
    updated_date: "2022-12-01",
    shopName: "Exotic Blossoms",
  },
  {
    key: "7",
    userName: "ginnyind",
    password: "ginny12345",
    status: "Active",
    user_id: 7,
    address: "678 Maple Street, City E",
    full_name: "Ginny Lee",
    birth_date: "1988-06-28",
    sex: "Female",
    points: 75,
    role: "individual",
    created_date: "2019-07-14",
    updated_date: "2023-06-12",
    shopName: "Sunny Blooms",
  },
  {
    key: "8",
    userName: "harryenterprise",
    password: "harrybiz789",
    status: "Active",
    user_id: 8,
    address: "1010 Factory Road, City F",
    full_name: "Harry White",
    birth_date: "1972-02-20",
    sex: "Male",
    points: 50,
    role: "enterprise",
    created_date: "2016-03-30",
    updated_date: "2023-03-22",
    shopName: "Blossom Bazaar",
  },
  {
    key: "9",
    userName: "johndoe",
    password: "johndoepass",
    status: "Active",
    user_id: 9,
    address: "1234 River Lane, City G",
    full_name: "John Doe",
    birth_date: "1980-01-15",
    sex: "Male",
    points: 80,
    role: "individual",
    created_date: "2021-05-10",
    updated_date: "2023-02-18",
    shopName: "Garden Delights",
  },
  {
    key: "10",
    userName: "janedoe",
    password: "janedoepass",
    status: "Active",
    user_id: 10,
    address: "4321 Oak Street, City H",
    full_name: "Jane Doe",
    birth_date: "1985-09-25",
    sex: "Female",
    points: 90,
    role: "individual",
    created_date: "2020-07-15",
    updated_date: "2023-03-15",
    shopName: "Colorful Dreams",
  },
];

// Quản lý seller
const SellerManage = () => {
  const [data, setData] = useState(initialData); // Khởi tạo từ initialData
  const [searchText, setSearchText] = useState(""); // State cho ô tìm kiếm

  // Lấy dữ liệu từ localStorage hoặc dùng initialData nếu không có
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("sellerDatas"));
    if (savedData && savedData.length > 0) {
      setData(savedData);
    } else {
      setData(initialData); // Dùng initialData nếu không có dữ liệu lưu trữ
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem("sellerDatas", JSON.stringify(data));
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
    localStorage.setItem("sellerData", JSON.stringify(newData));
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
    localStorage.setItem("sellerData", JSON.stringify(newData));
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
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
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
          <Link to={`/sellerdetail/${record.key}`} style={{ marginLeft: 8 }}>
            {" "}
            {/* Chuyển hướng đến trang seller detail */}
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

export default SellerManage;
