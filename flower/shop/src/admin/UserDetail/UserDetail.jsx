/* eslint-disable no-undef */
import { useParams } from "react-router-dom";
import "./UserDetail.scss";
import { useEffect, useState } from "react";

const UserDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL

  // Dữ liệu người dùng
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

  // State quản lý dữ liệu người dùng
  const [userData, setUserData] = useState(initialUserData);

  // Tìm user dựa trên ID từ URL
  const user = userData.find((user) => user.key === id);

  // State để quản lý điểm
  const [userPoints, setUserPoints] = useState(user ? user.points : 0);

  // Lấy số điểm từ `localStorage` khi trang được load
  useEffect(() => {
    if (user) {
      const savedPoints = localStorage.getItem(`user_points_${user.key}`);
      if (savedPoints) {
        setUserPoints(parseInt(savedPoints, 10)); // Cập nhật số điểm từ localStorage
      }
    }
  }, [id, user]);

  // Hàm xử lý khi thay đổi điểm
  const handlePointsChange = (e) => {
    const newPoints = parseInt(e.target.value, 10);
    setUserPoints(newPoints);
  };

  // Hàm lưu thông tin cập nhật
  const handleSaveChanges = () => {
    const updatedUserData = userData.map((user) =>
      user.key === id
        ? {
            ...user,
            points: userPoints,
          }
        : user
    );

    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData)); // Lưu userData vào localStorage
    localStorage.setItem(`user_points_${user.key}`, userPoints); // Lưu điểm vào localStorage
    alert("User Points updated successfully!"); // Hiển thị thông báo cập nhật thành công
  };

  return (
    <div className="user-detail-container">
      {user ? (
        <form className="user-detail-form">
          <h2>User Detail</h2>

          {/* Avatar */}
          <div className="form-group">
            <img
              src={user.avatar}
              alt="Avatar"
              style={{ borderRadius: "50%", width: "150px", height: "150px" }}
            />
          </div>

          {/* Thông tin chi tiết */}
          <div className="form-group">
            <label>Full Name:</label>
            <p>{user.full_name}</p>
          </div>
          <div className="form-group">
            <label>User ID:</label>
            <p>{user.user_id}</p>
          </div>
          <div className="form-group">
            <label>Address:</label>
            <p>{user.address}</p>
          </div>
          <div className="form-group">
            <label>Birth Date:</label>
            <p>{user.birth_date}</p>
          </div>
          <div className="form-group">
            <label>Sex:</label>
            <p>{user.sex}</p>
          </div>

          {/* Điểm và chỉnh sửa điểm */}
          <div className="form-group">
            <label>Points:</label>
            <input
              type="number"
              value={userPoints}
              onChange={handlePointsChange}
              min="0"
              max="100"
              style={{ width: "60px", textAlign: "center" }}
            />
          </div>

          {/* Ngày tạo và ngày cập nhật */}
          <div className="form-group">
            <label>Created Date:</label>
            <p>{user.created_date}</p>
          </div>
          <div className="form-group">
            <label>Updated Date:</label>
            <p>{user.updated_date}</p>
          </div>

          {/* Nút lưu thay đổi */}
          <div className="form-group">
            <button
              type="button"
              className="save-point"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetail;
