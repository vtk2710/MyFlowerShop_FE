import { useParams } from "react-router-dom";
import "./UserDetail.scss"; // Import file CSS

const UserDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL

  // Dữ liệu người dùng
  const userData = [
    { key: "1", userName: "user1", password: "pass1", status: "Active", user_id: 1, address: "123 Main Street, City A", full_name: "John Doe", birth_date: "1990-01-01", sex: "Male", points: 80 },
    { key: "2", userName: "user2", password: "pass2", status: "Active", user_id: 2, address: "456 Central Avenue, City B", full_name: "Jane Smith", birth_date: "1985-05-15", sex: "Female", points: 95 },
    { key: "3", userName: "ducky", password: "quackquack123", status: "Active", user_id: 3, address: "789 Lake Road, City C", full_name: "Daisy Duck", birth_date: "1992-03-22", sex: "Female", points: 70 },
    { key: "4", userName: "johndoe", password: "johndoepass", status: "Active", user_id: 4, address: "101 Hilltop Blvd, City D", full_name: "Johnny Doe", birth_date: "1980-12-30", sex: "Male", points: 60 },
    { key: "5", userName: "janedoe", password: "janedoepass", status: "Active", user_id: 5, address: "202 Valley Road, City E", full_name: "Janet Doe", birth_date: "1995-07-11", sex: "Female", points: 85 },
    { key: "6", userName: "admin", password: "admin12345", status: "Active", user_id: 6, address: "303 Ocean Drive, City F", full_name: "Admin User", birth_date: "1983-11-05", sex: "Male", points: 100 },
    { key: "7", userName: "superuser", password: "superuserpass", status: "Active", user_id: 7, address: "404 Mountain Road, City G", full_name: "Super User", birth_date: "1999-09-09", sex: "Male", points: 75 },
    { key: "8", userName: "guest", password: "guest123", status: "Active", user_id: 8, address: "505 Pine Street, City H", full_name: "Guest User", birth_date: "2000-02-28", sex: "Female", points: 50 },
  ];

  // Tìm user dựa trên ID từ URL
  const user = userData.find((user) => user.key === id);

  return (
    <div className="user-detail-container">
      {user ? (
        <form className="user-detail-form">
          <h2>User Detail</h2>
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
          <div className="form-group">
            <label>Points:</label>
            <p>{user.points}</p>
          </div>
        </form>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetail;
